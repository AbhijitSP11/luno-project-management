import NextAuth, { NextAuthOptions } from "next-auth"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

import jwt from 'jsonwebtoken'

export const authOptions: NextAuthOptions = {
    debug: true, 
    secret: process.env.NEXTAUTH_SECRET,
    providers: [   
      CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
          }
  
          // Return user object that will be passed to callbacks
          return {
            id: data.userId,
            email: credentials.email,
            name: data.name,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      }
      }),
      GithubProvider({
        clientId: process.env.NEXT_PUBLIC_GITHUB_ID!,
        clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET!,
        authorization: {
          params: {
            scope: "openid profile email",
          },
        },
      }),
      GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
        authorization: {
          params: {
              redirect_uri: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/callback/google`,
          },
      },
      }),
    ],
    callbacks: {
   
      async signIn({ user, account, profile }) {
        if (!user.email) return false;
        
        try {
          if (account?.provider === 'credentials') {
            return true;
          }
  
          const customToken = jwt.sign(
            {
              email: user.email,
              name: user.name,
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
          );
  
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/oauth`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                image: user.image,
                provider: account?.provider,
                providerAccountId: account?.providerAccountId,
                accessToken: customToken,
              }),
            }
          );
  
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend registration error:', errorData);
            return false;
          }
  
          const userData = await response.json();
  
          return true;
        } catch (error) {
          console.error("Sign in error:", error);
          return false;
        }
      },
      
      async jwt({ token, user, account }: { 
        token: JWT, 
        user?: any, 
        account?: any 
      }): Promise<JWT> {
        if (account && user) {
            // Generate custom JWT token
            if (account.provider === 'credentials') {
              return {
                ...token,
                accessToken: user.accessToken,
                userId: user.id,
              };
            } else {
            const customToken = jwt.sign(
              {
                email: user.email,
                name: user.name,
              },
              process.env.JWT_SECRET!,
              { expiresIn: '24h' }
            );
          
          return {
            ...token,
            accessToken: customToken,
          }
        }
        }
        return token;
      },
  
      async session({ session, token }: { 
        session: Session, 
        token: JWT 
      }): Promise<Session> {
        if (session?.user) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`,
              {
                headers: {
                  Authorization: `Bearer ${token.accessToken}`,
                },
              }
            );
  
            if (!response.ok) {
              throw new Error('Failed to fetch user data');
            }
  
            const userData = await response.json();
            return {
              ...session,
              accessToken: token.accessToken,
              user: {
                ...session.user,
                id: userData.userId.toString(),
                username: userData.username,
                teamId: userData.teamId?.toString(),
              },
            };
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
        return session;
      },
  
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith("/")) return `${baseUrl}${url}`
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) return url
        return baseUrl
      },
    },
    pages: {
      signIn: '/',
      error: '/api/auth/error',
    },
    session: {
      strategy: 'jwt',
    },
  }