// types/next-auth.d.ts
import "next-auth";
import "next-auth/jwt";
import { DefaultSession } from "next-auth";
import { UserRole } from "@/enum";

declare module "next-auth" {
  interface User {
    id: string;
    isEmailVerified: boolean;
    refreshToken: string;
    accessToken?: string;
    accessTokenExpires: number;
    accessTokenExpiresAt: number;
    role: UserRole;
  }

  interface Session {
    user: {
      id: string;
      isEmailVerified: boolean;
      refreshToken: string;
      accessToken: string;
      role: UserRole;
      accessTokenExpires: number;
    } & DefaultSession["user"];
    accessTokenExpires?: number;
    role: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isEmailVerified: boolean;
    refreshToken: string;
    accessToken: string;
    accessTokenExpires: number;
    role: UserRole;
  }
}
