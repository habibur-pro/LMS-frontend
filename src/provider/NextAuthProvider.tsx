"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
export type TNextAuthProvider = { children: ReactNode };
import { Toaster } from "sonner";
const NextAuthProvider = ({ children }: TNextAuthProvider) => {
  return (
    <SessionProvider>
      {children}
      <Toaster richColors position="top-center" />
    </SessionProvider>
  );
};

export default NextAuthProvider;
