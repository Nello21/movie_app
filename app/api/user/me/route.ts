import { NextRequest, NextResponse } from "next/server";
import { getToken, verifyToken } from "@/services/auth/utils";

export async function GET(req: NextRequest) {
  try {
    const token = getToken(req);
    if (!token) {
      return new NextResponse("Требуется авторизация", { status: 401 });
    }

    const user = await verifyToken(token);
    if (!user) {
      return new NextResponse("Не удалось верифицировать токен", {
        status: 401,
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Ошибка получения профиля", { status: 500 });
  }
}
