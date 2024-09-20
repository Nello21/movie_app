import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().set("token", "", { expires: new Date(0) });
  cookies().set("isAuth", "", { expires: new Date(0) });
  cookies().set("ADMIN", "", { expires: new Date(0) });

  return NextResponse.json({ message: "Выход выполнен" });
}
