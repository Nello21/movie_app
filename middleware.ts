import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken, verifyToken } from "@/services/auth/utils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const token = getToken(request);

  if (!token) {
    response.cookies.delete("isAuth");
    response.cookies.delete("ADMIN");

    if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return response;
  }

  try {
    const user = await verifyToken(token);
    if (user) {
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

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
