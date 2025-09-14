import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import { createCustomer, getCustomer } from "./data-storage";
import Credentials from "@auth/core/providers/credentials";
import { verifyPassword } from "../api/auth/password-utils";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);
        const customer = await getCustomer(credentials.email);
        if (!customer) return null;

        const isValid = await verifyPassword(
          credentials.password,
          customer.password
        );
        if (!isValid) return null;
        return {
          id: customer.id,
          email: customer.email,
          name: customer.name,
        };
      },
    }),
  ],
  callbacks: {
    authorized(auth, request) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        if (account.provider === "google") {
          const existingUser = await getCustomer(user.email);
          if (!existingUser) {
            await createCustomer({
              email: user.email,
              name: user.name,
            });
          }
        }
        return true;
      } catch (error) {
        console.error("SIGNIN ERROR:", error);
        return false;
      }
    },
    async session({ session, user }) {
      if (session?.user?.email) {
        const customer = await getCustomer(session.user.email);
        if (customer) {
          session.user.customerId = customer.id;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
