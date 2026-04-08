import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.email === "admin@nahda.com" && body.password === "admin123") {
    return NextResponse.json({
      token: "admin-token-123",
    });
  }

  return NextResponse.json({ error: "Login gagal" }, { status: 401 });
}
