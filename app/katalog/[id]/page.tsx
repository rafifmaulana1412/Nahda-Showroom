import { prisma } from "@/lib/prisma";

export default async function DetailMobil({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const car = await prisma.car.findUnique({
    where: { id },
  });

  if (!car) {
    return <div className="p-10 text-center">Mobil tidak ditemukan</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* LEFT */}
      <div className="md:col-span-2 space-y-6">
        {/* 🔥 GAMBAR */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {car.images && car.images.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {car.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  className="w-full h-48 object-cover rounded-xl"
                />
              ))}
            </div>
          ) : (
            <img
              src="/no-image.png"
              className="w-full h-64 object-cover rounded-xl"
            />
          )}
        </div>

        {/* 🔥 DESKRIPSI */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Deskripsi</h2>
          <div className="text-gray-700 whitespace-pre-line">
            {car.description || "-"}
          </div>
        </div>

        {/* 🔥 FITUR */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Fitur</h2>

          {car.features && car.features.length > 0 ? (
            <ul className="grid grid-cols-2 gap-2 text-gray-700">
              {car.features.map((f: string, i: number) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-500">✔</span> {f}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Tidak ada fitur</p>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white rounded-2xl p-6 shadow-sm h-fit">
        <p className="text-sm text-green-500 mb-1">
          {car.isAvailable ? "Ready" : "Tidak Ready"}
        </p>

        <h1 className="text-xl font-bold mb-2">{car.name}</h1>

        <p className="text-2xl font-bold text-orange-500 mb-4">
          Rp {car.price.toLocaleString("id-ID")}
        </p>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p>KM: {car.mileage?.toLocaleString("id-ID")} km</p>
          <p>Warna: {car.color || "-"}</p>
          <p>Lokasi: {car.location || "-"}</p>
        </div>

        <a
          href={`https://wa.me/${car.contactPerson}`}
          target="_blank"
          className="block text-center bg-orange-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}
