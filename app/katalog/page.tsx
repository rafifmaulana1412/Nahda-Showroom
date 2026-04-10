import { prisma } from "@/lib/prisma";
import CarCard from "@/components/CarCard";
import FilterSidebar from "@/components/FilterSidebar";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function KatalogPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const where: Record<string, unknown> = { isAvailable: true };

  if (sp.kondisi && sp.kondisi !== "semua") where.condition = sp.kondisi;
  if (sp.transmisi && sp.transmisi !== "semua")
    where.transmission = sp.transmisi;
  if (sp.harga_min || sp.harga_max) {
    where.price = {
      ...(sp.harga_min ? { gte: Number(sp.harga_min) } : {}),
      ...(sp.harga_max ? { lte: Number(sp.harga_max) } : {}),
    };
  }
  if (sp.tahun_min || sp.tahun_max) {
    where.year = {
      ...(sp.tahun_min ? { gte: Number(sp.tahun_min) } : {}),
      ...(sp.tahun_max ? { lte: Number(sp.tahun_max) } : {}),
    };
  }
  if (sp.cari) {
    where.OR = [
      { name: { contains: sp.cari, mode: "insensitive" } },
      { brand: { contains: sp.cari, mode: "insensitive" } },
      { model: { contains: sp.cari, mode: "insensitive" } },
      { location: { contains: sp.cari, mode: "insensitive" } },
    ];
  }

  const cars = await prisma.car.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const currentFilters = {
    cari: sp.cari,
    kondisi: sp.kondisi,
    transmisi: sp.transmisi,
    harga_min: sp.harga_min,
    harga_max: sp.harga_max,
    tahun_min: sp.tahun_min,
    tahun_max: sp.tahun_max,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Katalog Mobil Bekas
        </h1>
        <p className="text-gray-500 mt-1">{cars.length} mobil ditemukan</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 shrink-0">
          <Suspense>
            <FilterSidebar currentFilters={currentFilters} />
          </Suspense>
        </aside>

        <div className="flex-1">
          {cars.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 text-lg">
                Tidak ada mobil yang sesuai filter
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Coba ubah filter pencarian Anda
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car as any} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
