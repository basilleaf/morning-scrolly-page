import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "session";
const PROTECTED_PREFIXES = ["/api/todos", "/api/news-check"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
  if (!isProtected) return NextResponse.next();

  const session = request.cookies.get(SESSION_COOKIE);
  const password = process.env.ADMIN_PASSWORD;

  if (!password || session?.value !== password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/todos/:path*", "/api/news-check"],
};
