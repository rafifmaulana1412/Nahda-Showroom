import { redirect } from "next/navigation";
import Link from "next/link";
import { formatPrice, formatMileage } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import DeleteCarButton from "@/components/DeleteCarButton";
import ToggleAvailable from "@/components/ToggleAvailable";
import SalesChart from "@/components/salesChart";

import { getServerSession } from "next-auth";

export default async function AdminPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }
  const [cars, contactCount] = await Promise.all([
    prisma.car.findMany({ orderBy: { id: "desc" } }),
    prisma.contact.count(),
  ]);
  const total = cars.length;
  const available = cars.filter((c) => c.isAvailable).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-500 text-sm">Nahda Showroom Management</p>
        </div>

        <Link
          href="/admin/tambah-mobil"
          className="px-5 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg text-sm font-semibold"
        >
          + Tambah Mobil
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total Mobil",
            value: total,
            color: "bg-blue-50 text-blue-700",
          },
          {
            label: "Mobil Ready",
            value: available,
            color: "bg-green-50 text-green-700",
          },
          {
            label: "Kontak Masuk",
            value: contactCount,
            color: "bg-purple-50 text-purple-700",
          },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-5 ${s.color}`}>
            <p className="text-3xl font-bold">{s.value}</p>
            <p className="text-sm font-medium mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* GRAFIK */}
      <div className="mb-8">
        <SalesChart />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Daftar Mobil</h2>
          <span className="text-sm text-gray-400">{total} unit</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-5 py-3 text-left">Nama Mobil</th>
                <th className="px-5 py-3 text-left">Harga</th>
                <th className="px-5 py-3 text-left">KM</th>
                <th className="px-5 py-3 text-left">Lokasi</th>
                <th className="px-5 py-3 text-left">Status</th>
                <th className="px-5 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {cars.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{car.name}</p>
                  </td>

                  <td className="px-5 py-4 font-semibold text-primary">
                    {formatPrice(car.price)}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {formatMileage(car.mileage)}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {car.location || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <ToggleAvailable
                      carId={car.id}
                      isAvailable={car.isAvailable}
                    />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/katalog/${car.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-medium transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Lihat
                      </Link>

                      <Link
                        href={`/admin/edit/${car.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-500 hover:bg-orange-100 text-xs font-medium transition-colors"
                      >
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit
                      </Link>

                      <DeleteCarButton carId={car.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
