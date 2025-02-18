import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from "./prisma";

export const config = {
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: { maxAge: 60 * 60 * 24 * 30},
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    // GoogleProvider({
    //   clientId: String(process.env.GOOGLE_CLIENT_ID),
    //   clientSecret: String(process.env.GOOGLE_CLIENT_SECRET)
    // }),
    CredentialsProvider({
      id: "credentials",
      name: "Creadentials",
      type: "credentials",
      credentials: {
        email: { label: "メールアドレス", type: "email", placeholder: "" },
        password: { label: "パスワード", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials) throw new Error("credentials is empty");
        const userCredentials = {
          email: credentials.email,
          password: credentials.password,
        };
        console.log("ログインプロセス");
        console.warn("ログインプロセス");
        const res = await fetch(
          `${process.env.API_URL}/api/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(userCredentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user
        } else {
          console.log("login failed");
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
        }
      }

      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    })
  },
  // debug: true
} satisfies NextAuthOptions

export function serverAuth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, config)
}