/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserRole } from "@/enum";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log({ credentials });
          const res = await fetch(`${process.env.API_BASE_URL}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            throw new Error("Invalid credentials or user not found");
          }

          const result = await res.json();
          console.log("auth result", result);

          const user = result?.data;
          if (!user || !user.accessToken) {
            throw new Error("User data or access token missing");
          }

          return user;
        } catch (err: any) {
          console.error("Authorize error:", err.message || err);
          throw new Error("Login failed. Please try again.");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.isEmailVerified = user.isEmailVerified;
        token.name = user.name;
        token.email = user.email;
        token.refreshToken = user.refreshToken;
        token.accessToken = user.accessToken as string;
        token.accessTokenExpires = user.accessTokenExpiresAt;
        token.role = user.role;
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token;
      }
      if (trigger === "update" && session) {
        return { ...token, ...session };
      }
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session) {
        session.user.id = token.id as string;
        session.user.isEmailVerified = token.isEmailVerified as boolean;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.refreshToken = token.refreshToken as string;
        session.user.accessToken = token.accessToken as string;
        session.user.role = token.role as UserRole;
        session.accessTokenExpires = token.accessTokenExpires as number;
      }
      return session;
    },
  },

  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("Refreshing access token...");

    const res = await fetch(`${process.env.API_BASEURL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    const refreshed: any = await res.json();

    if (!res.ok || !refreshed.data?.accessToken) {
      throw new Error(refreshed.error || "Failed to refresh access token");
    }

    return {
      ...token,
      accessToken: refreshed.data.accessToken,
      accessTokenExpires:
        refreshed?.data?.accessTokenExpiresAt ?? token.accessTokenExpires,
      refreshToken: refreshed.data.refreshToken ?? token.refreshToken,
    };
  } catch (err: any) {
    console.error("Error refreshing token", err.message || err);
    return {
      ...token,
      error: "RefreshTokenError",
      accessToken: "",
    };
  }
}
