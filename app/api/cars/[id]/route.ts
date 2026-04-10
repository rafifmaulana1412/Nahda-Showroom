import { prisma } from "@/lib/prisma";

// 🔥 GET DETAIL
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      return Response.json({ error: "Mobil tidak ditemukan" }, { status: 404 });
    }

    return Response.json(car);
  } catch (error) {
    console.error("ERROR GET DETAIL:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// 🔥 UPDATE
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    // Kalau cuma toggle isAvailable
    if (Object.keys(body).length === 1 && "isAvailable" in body) {
      const car = await prisma.car.update({
        where: { id },
        data: { isAvailable: body.isAvailable },
      });
      return Response.json(car);
    }

    // Full update
    const car = await prisma.car.update({
      where: { id },
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        year: body.year,
        price: body.price,
        mileage: body.mileage,
        color: body.color,
        location: body.location,
        contactPerson: body.contactPerson,
        description: body.description,
        features: body.features
          ? body.features.split(",").map((f: string) => f.trim())
          : [],
        images: body.images || [],
        isAvailable: body.isAvailable ?? true,
        isFeatured: body.isFeatured ?? false,
        condition: body.condition || "bekas",
      },
    });

    return Response.json(car);
  } catch (error) {
    console.error("ERROR UPDATE:", error);
    return Response.json({ error: "Gagal update mobil" }, { status: 500 });
  }
}

// 🔥 DELETE
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await prisma.car.delete({
      where: { id },
    });

    return Response.json({ message: "Mobil berhasil dihapus" });
  } catch (error) {
    console.error("ERROR DELETE:", error);
    return Response.json({ error: "Gagal hapus mobil" }, { status: 500 });
  }
}
