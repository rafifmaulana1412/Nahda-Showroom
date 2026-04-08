import { prisma } from "@/lib/prisma";
import { FilterParams } from "@/lib/types";
import CarCard from "@/components/CarCard";
import FilterSidebar from "@/components/FilterSidebar";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

function filterCars(params: FilterParams, cars: any[]) {
  return cars.filter((car) => {
    if (params.minPrice && car.price < params.minPrice) return false;
    if (params.maxPrice && car.price > params.maxPrice) return false;
    if (params.search) {
      const q = params.search.toLowerCase();
      if (
        !car.name.toLowerCase().includes(q) &&
        !(car.location && car.location.toLowerCase().includes(q))
      )
        return false;
    }
    return car.isAvailable;
  });
}

export default async function KatalogPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  const filters: FilterParams = {
    minPrice: sp.harga_min ? Number(sp.harga_min) : undefined,
    maxPrice: sp.harga_max ? Number(sp.harga_max) : undefined,
    search: sp.cari || undefined,
  };

  const cars = await prisma.car.findMany({
    where: { isAvailable: true },
    orderBy: { name: "asc" },
  });
  const filtered = filterCars(filters, cars);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Katalog Mobil</h1>
        <p className="text-gray-500 mt-1">{filtered.length} mobil ditemukan</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-72 shrink-0">
          <FilterSidebar currentFilters={filters} />
        </aside>

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
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
              {filtered.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
