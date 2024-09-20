import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description, genre, rating, imageUrl } = await req.json();

  if (!title || !description || !genre.length || !imageUrl || isNaN(rating)) {
    return NextResponse.json({ error: "Invalid movie data" }, { status: 400 });
  }

  try {
    await prisma.movie.create({
      data: {
        title,
        description,
        genre,
        imageUrl,
        rating,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create movie" },
      { status: 500 }
    );
  }
}
