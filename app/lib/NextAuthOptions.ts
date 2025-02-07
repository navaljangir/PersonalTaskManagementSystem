import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { DefaultSession, NextAuthOptions, Session } from "next-auth";
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { JWT as JWTType } from "next-auth/jwt";
import JWT from 'jsonwebtoken'
import { users } from "@/db/schema";

const adapter = DrizzleAdapter(db)
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            token : string;
        } & DefaultSession['user']
    }
}
interface token extends JWTType {
    uid: string;
    jwtToken: string;
  }
  
  interface user {
    id: string;
    name: string;
    email: string;
    token: string;
  }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'email',
            credentials: {
                email: { label: 'email', placeholder: 'Enter your email', type: 'text' },
                password: { label: 'password', placeholder: 'Enter your password', type: 'text' }
            }, async authorize(credentials: Record<'email' | 'password', string> | undefined) {
                console.log('credentials', credentials)
                const email = credentials?.email || ''
                const password = credentials?.password || '';
                try{
                    const user = await db.query.users.findFirst({
                        where : eq(users.email , email)
                    })
                    if(!user){
                        return null
                    }
                    const userPassword = user.password || '';
                    const verifyPassword = await bcrypt.compare(password , userPassword);
                    if(!verifyPassword){
                        return null
                    }
                    const jwt = JWT.sign({userId : user.id }, process.env.NEXTAUTH_SECRET!) 
                    await db.update(users).set({ token : jwt}).where(eq(users.email , email))
                    return {
                        id : user.id, 
                        email : user.email,
                        name : user.name,
                        token : jwt
                    }
                }catch(e){
                    console.log('Error while signing up' , e)
                   throw new Error('Database is Down')
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || '',
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        jwt: async ({ token, user }): Promise<JWTType> => {
            const newToken: token = token as token;
            if (user) {
              newToken.uid = user.id;
              newToken.jwtToken = (user as user).token;
            }
            return newToken;
          },
        session: async ({ session, token }: { session: Session; token: JWTType; }) => {
            if (session && session?.user) {
                session.user.id = token.sub || '';
                session.user.token = token.jwttoken as string
            }
            return session
        }
    },
    adapter,
    pages : {
        signIn : '/signin'
    }
}