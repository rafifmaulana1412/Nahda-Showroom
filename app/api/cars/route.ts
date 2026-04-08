import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function checkAuth(req: NextRequest) {
  const token = req.headers.get("authorization");
  return token === "Bearer admin-token-123";
}

function parseTextArray(value: unknown) {
  if (Array.isArray(value)) return value.filter(Boolean).map(String);
  if (typeof value === "string")
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  return [];
}

// GET semua mobil (public)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search");

    const cars = await prisma.car.findMany({
      where: {
        isAvailable: true,
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { brand: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cars);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 },
    );
  }
}

// CREATE mobil (protected)
export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const car = await prisma.car.create({
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,

        year: body.year ? Number(body.year) : 0,
        price: body.price ? Number(body.price) : 0,

        // 🔥 FIX UTAMA (WAJIB)
        condition: body.condition || "Bekas",

        // 🔥 BIAR GA ERROR LAGI
        transmission: body.transmission || "AT",
        fuel: body.fuel || "Bensin",

        mileage: body.mileage ? Number(body.mileage) : 0,
        color: body.color || null,

        images: body.images,
        description: body.description || null,
        features: parseTextArray(body.features),

        location: body.location || null,
        contactPerson: body.contactPerson || null,

        paymentMethods: parseTextArray(body.paymentMethods),

        isAvailable: body.isAvailable ?? true,
        isFeatured: body.isFeatured ?? false,
      },
    });

    return NextResponse.json(car, { status: 201 });
  } catch (error) {
    console.log("ERROR CREATE CAR:", error);

    return NextResponse.json(
      { error: "Gagal menyimpan data" },
      { status: 500 },
    );
  }
}
