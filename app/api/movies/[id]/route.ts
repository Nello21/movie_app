import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) },
    });

    if (!movie) {
      return new NextResponse("Movie not found", { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    return new NextResponse("Error fetching movie", { status: 500 });
  }
}
