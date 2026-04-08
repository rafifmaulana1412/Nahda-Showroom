import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 30, // 🔥 30 menit
  },

  jwt: {
    maxAge: 60 * 30,
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});
export { handler as GET, handler as POST };
