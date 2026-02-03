// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes that anyone can access
const publicPaths = ["/", "/login", "/forgot-password"];
const authCookieName = "vahanex-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user is logged in
  const isLoggedIn = request.cookies.get(authCookieName)?.value === "1";

  // Root path
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(isLoggedIn ? "/dashboard" : "/login", request.url)
    );
  }

  // Allow public paths
  if (publicPaths.some((p) => pathname === p || pathname.startsWith(p + "/"))) {
    // If logged in and visiting /login, redirect to dashboard
    if (pathname === "/login" && isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // Protect private routes (dashboard and others)
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Default: allow
  return NextResponse.next();
}

// Proxy config: match all paths except static files and images
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
