import prisma from "@/lib/db";

import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id)
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 }
    );

  try {
    await prisma.movie.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete movie" },
      { status: 500 }
    );
  }
}
