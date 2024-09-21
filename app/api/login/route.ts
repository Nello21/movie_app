import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { createToken } from "@/services/auth/utils";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return new NextResponse("Неправильные учетные данные", { status: 401 });
  }

  const token = await createToken({
    id: user.id,
    role: user.role,
  });

  const response = NextResponse.json({ success: true });

  const cookieStore = cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
