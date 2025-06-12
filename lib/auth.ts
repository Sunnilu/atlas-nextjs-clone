import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

// ✅ Define config
export const authConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

// ✅ Export the NextAuth handler
export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
