import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getToken, verifyToken } from "@/services/auth/utils";

export async function POST(req: NextRequest) {
  try {
    const { movieId } = await req.json();

    const token = getToken(req);

    if (!token) {
      return new NextResponse(
        JSON.stringify({ message: "Требуется авторизация" }),
        { status: 401 }
      );
    }

    const user = await verifyToken(token);

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Не удалось верифицировать токен" }),
        {
          status: 401,
        }
      );
    }

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return new NextResponse(
        JSON.stringify({ message: "Профиль не найден" }),
        { status: 404 }
      );
    }

    await prisma.profile.update({
      where: { userId: user.id },
      data: {
        favorites: {
          connect: { id: movieId },
        },
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Фильм добавлен в избранное" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Ошибка при добавлении в избранное" }),
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { movieId } = await req.json();

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
    });

    if (!profile) {
      return new NextResponse("Профиль не найден", { status: 404 });
    }

    await prisma.profile.update({
      where: { userId: user.id },
      data: {
        favorites: {
          disconnect: { id: movieId },
        },
      },
    });

    return new NextResponse("Фильм удален из избранного", { status: 200 });
  } catch (error) {
    return new NextResponse("Ошибка при удалении из избранного", {
      status: 500,
    });
  }
}
