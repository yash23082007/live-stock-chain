import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        let user: any = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.fullName || "User",
            role: user.role,
          };
        }
        
        if (!user && credentials.email.includes("@")) {
          // Dev mock: auto-register on failed login if basic email matches for MVP tests
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              password: credentials.password, 
              role: "farmer",
              fullName: "Test Farmer User"
            }
          });
          return {
            id: user.id,
            email: user.email,
            name: user.fullName,
            role: user.role,
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  }
};
