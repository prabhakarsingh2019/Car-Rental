import { NextResponse } from "next/server";
import { auth } from "./app/_lib/auth";

export async function middleware(request) {
  const session = await auth(); // pass request here

  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // User is authenticated, continue
  return NextResponse.next();
}

// Protect account and cars pages
export const config = {
  matcher: ["/account/:path*", "/cars/:path"],
};
