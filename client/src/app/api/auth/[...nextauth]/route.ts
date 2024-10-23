// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import { Session } from "next-auth"
import { AuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import jwt from 'jsonwebtoken'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
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
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;
      
      try {

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
        console.log("user created via oauth", userData)

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
          // userId: user.id,
        }
      }
      console.log("jwt token log", token)
      return token;
    },

    async session({ session, token }: { 
      session: Session, 
      token: JWT 
    }): Promise<Session> {
      if (session?.user) {
        try {
          console.log("token.accessToken", token.accessToken);
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
          console.log("userData log in route ts" , userData)
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
      console.log("session log in route.ts", session)
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }