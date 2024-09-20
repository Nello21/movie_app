import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies);
  } catch (error) {
    return new NextResponse("Ошибка получения фильмов", { status: 500 });
  }
}
