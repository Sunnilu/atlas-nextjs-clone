// types/next-auth.d.ts

import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // ✅ always string
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string; // ✅ add this to match token.sub in callbacks
    id?: string; // optional, if needed
  }
}
