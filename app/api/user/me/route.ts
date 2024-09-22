import { NextRequest, NextResponse } from "next/server";
import { getToken, verifyToken } from "@/services/auth/utils";

export async function GET(req: NextRequest) {
  const token = getToken(req);

  if (token) {
    const user = await verifyToken(token);
    if (!user) {
      return new NextResponse("Не удалось верифицировать токен", {
        status: 401,
      });
    }
    return NextResponse.json(user);
  }
}
