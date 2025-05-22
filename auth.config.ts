import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const authRoutes = nextUrl.pathname.startsWith("/sign-");
      if (isLoggedIn && authRoutes) {
        return NextResponse.redirect(new URL("/home", nextUrl));
      }
      return true;
    },
  },
  providers: [Credentials({})],
} satisfies NextAuthConfig;
