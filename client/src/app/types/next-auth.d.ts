import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
    user?: {
      id?: string
      username?: string
      teamId?: string
      email?: string
      name?: string
      image?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    userId?: string
  }
}