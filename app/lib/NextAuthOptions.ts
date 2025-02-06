import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { DefaultSession, NextAuthOptions, Session } from "next-auth";
import bcrypt from 'bcrypt'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { JWT } from "next-auth/jwt";
import { users } from "@/db/schema";

const adapter = DrizzleAdapter(db)
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
        } & DefaultSession['user']
    }
}
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: 'email', placeholder: 'Enter your email', type: 'text' },
                password: { label: 'password', placeholder: 'Enter your password', type: 'text' }
            }, async authorize(credentials: Record<'email' | 'password', string> | undefined) {
                const email = credentials?.email || ''
                const password = credentials?.password || ''
                const user = await db.query.users.findFirst({
                    where: eq(users.email, email)
                })
                if (!user) {
                    return null
                }
                const userPassword = user.password || '';
                const verifyPassword = await bcrypt.compare(password, userPassword);
                if (!verifyPassword) {
                    return null
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
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
        session: async ({ session, token }: { session: Session; token: JWT; }) => {
            if (session && session?.user) {
                session.user.id = token.sub || '';
            }
            return session
        }
    },
    adapter,
    pages : {
        signIn : '/signin'
    }
}