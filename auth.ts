import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import prisma from "./lib/prisma/prisma";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as any },
        });

        if (!user) return null;

        if (credentials.password !== user.password) return null;

        return { id: user.id, email: user.email };
      },
    }),
  ],
});
