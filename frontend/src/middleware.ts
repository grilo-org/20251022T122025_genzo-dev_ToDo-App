import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const jwtSession = request.cookies.get(
    process.env.COOKIE_NAME || "loginSession"
  )?.value;
  const isAuthenticated = !!jwtSession;

  // const isAuth = !!token;
  // const isLoginPage = request.nextUrl.pathname.startsWith("/login");

  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|register|_next/static|_next/image|favicon.ico).*)"],
};
