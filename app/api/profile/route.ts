import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
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

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
      include: {
        user: true,
        favorites: true,
      },
    });
    if (!profile) {
      return new NextResponse("Профиль не найден", { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return new NextResponse("Ошибка получения профиля", { status: 500 });
  }
}
