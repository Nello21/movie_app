import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken, verifyToken } from "@/services/auth/utils";

export async function middleware(request: NextRequest) {
  const token = getToken(request);
  const { pathname } = request.nextUrl;

  const response = NextResponse.next();

  if (token) {
    try {
      const user = await verifyToken(token);
      if (user) {
        response.cookies.set("isAuth", "true");
        if (user.role === "ADMIN") {
          response.cookies.set("ADMIN", "true");
        }
        if (pathname.startsWith("/dashboard") && user.role !== "ADMIN") {
          return NextResponse.redirect(new URL("/", request.url));
        }

        if (pathname === "/login" || pathname === "/register") {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return response;
      }
    } catch (error) {
      console.error("Ошибка верификации токена:", error);
    }
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
