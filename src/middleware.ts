import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Public pages

  if (
    path === "/" ||
    /^\/courses\/[^\/]+$/.test(path) // /courses/:slug
  ) {
    return NextResponse.next();
  }

  // Auth pages: login & register

  if (path === "/login" || path === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // Dashboard: login required
  if (path === "/my-class" || path.startsWith("/my-class/")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  // Admin pages: only admin
  if (path === "/admin" || path.startsWith("/admin/")) {
    if (!token || token.role !== "admin")
      return NextResponse.redirect(new URL("/login", req.url));
    return NextResponse.next();
  }

  // Any other route: redirect to login
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
    "/my-class/:path*",
  ],
};
