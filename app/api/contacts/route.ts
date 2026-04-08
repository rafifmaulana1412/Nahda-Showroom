import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("authorization");
  return token === "Bearer admin-token-123";
}

// GET (protected admin)
export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data kontak" },
      { status: 500 },
    );
  }
}

// POST (public)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const contact = await prisma.contact.create({
      data: {
        nama: body.nama,
        telepon: body.telepon,
        email: body.email,
        keperluan: body.keperluan,
        pesan: body.pesan,
        carId: body.carId || null,
      },
    });
    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan data kontak" },
      { status: 500 },
    );
  }
}
