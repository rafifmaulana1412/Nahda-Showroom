import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ VALIDASI
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 },
      );
    }

    // ✅ CEK USER
    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Email sudah dipakai" },
        { status: 400 },
      );
    }

    // ✅ HASH PASSWORD
    const hashed = await bcrypt.hash(body.password, 10);

    // ✅ CREATE USER
    await prisma.user.create({
      data: {
        email: body.email,
        password: hashed,
      },
    });

    // ✅ RESPONSE CLEAN (NO PASSWORD)
    return NextResponse.json({
      message: "User berhasil dibuat",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
