import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPage = nextUrl.pathname.startsWith("/admin");
      if (isOnAdminPage) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
  providers: [Credentials({})],
} satisfies NextAuthConfig;
