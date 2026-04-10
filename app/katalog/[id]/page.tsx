import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import KontakForm from "@/components/KontakForm";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

const formatMileage = (km: number) =>
  km === 0 ? "Baru" : `${new Intl.NumberFormat("id-ID").format(km)} km`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) return { title: "Mobil tidak ditemukan - Nahda Showroom" };

  const title = `${car.name} - ${formatPrice(car.price)} | Nahda Showroom`;
  const description = `${car.name} tahun ${car.year}, ${formatMileage(car.mileage)}, warna ${car.color}. ${car.description?.slice(0, 120)}...`;
  const image = car.images?.[0] || "/logo.png";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: car.name }],
      type: "website",
      siteName: "Nahda Showroom",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function DetailMobil({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });
  if (!car) notFound();

  const waNumber = car.contactPerson?.replace(/\D/g, "") || "6281234567890";
  const waMsg = encodeURIComponent(
    `Halo Nahda Showroom, saya tertarik dengan ${car.name} (${formatPrice(car.price)}). Apakah masih tersedia?`,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">
          Beranda
        </Link>
        <span>/</span>
        <Link href="/katalog" className="hover:text-primary">
          Katalog
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">
          {car.name}
        </span>
      </nav>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <ImageGallery images={car.images} name={car.name} />

          {/* Spesifikasi */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Spesifikasi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "Tahun", value: car.year.toString() },
                { label: "Kilometer", value: formatMileage(car.mileage) },
                {
                  label: "Transmisi",
                  value: car.transmission === "matic" ? "Matic" : "Manual",
                },
                {
                  label: "Bahan Bakar",
                  value: car.fuel?.charAt(0).toUpperCase() + car.fuel?.slice(1),
                },
                { label: "Warna", value: car.color },
                { label: "Lokasi", value: car.location || "-" },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                  <p className="font-semibold text-gray-800 text-sm">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Deskripsi</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {car.description || "-"}
            </p>
          </div>

          {/* Fitur */}
          {car.features && car.features.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Fitur Unggulan
              </h2>
              <div className="flex flex-wrap gap-2">
                {car.features.map((f, i) => (
                  <span
                    key={i}
                    className="bg-orange-50 text-primary border border-orange-200 text-sm px-3 py-1.5 rounded-full font-medium"
                  >
                    ✓ {f}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metode Pembayaran */}
          {car.paymentMethods && car.paymentMethods.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Metode Pembayaran
              </h2>
              <div className="flex flex-wrap gap-2">
                {car.paymentMethods.map((m, i) => (
                  <span
                    key={i}
                    className="bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1.5 rounded-full font-medium"
                  >
                    💳 {m}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Form Kontak */}
          <KontakForm carId={car.id} />
        </div>

        {/* RIGHT - Sticky */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-20">
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${car.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
            >
              {car.isAvailable ? "✓ Ready" : "✗ Terjual"}
            </span>

            <h1 className="text-xl font-bold text-gray-900 mt-3 mb-2 leading-tight">
              {car.name}
            </h1>
            <p className="text-3xl font-bold text-primary mb-1">
              {formatPrice(car.price)}
            </p>
            <p className="text-xs text-gray-400 mb-6">
              Harga dapat dinegosiasikan
            </p>

            <div className="space-y-3 mb-6 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Tahun</span>
                <span className="font-medium text-gray-900">{car.year}</span>
              </div>
              <div className="flex justify-between">
                <span>Kilometer</span>
                <span className="font-medium text-gray-900">
                  {formatMileage(car.mileage)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Transmisi</span>
                <span className="font-medium text-gray-900">
                  {car.transmission === "matic" ? "Matic" : "Manual"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Lokasi</span>
                <span className="font-medium text-gray-900">
                  {car.location || "-"}
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/${waNumber}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center flex items-center justify-center gap-2 mb-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Tanya via WhatsApp
            </a>

            <Link
              href="/simulasi-kredit"
              className="btn-outline w-full text-center block text-sm"
            >
              Simulasi Kredit
            </Link>

            <p className="text-xs text-gray-400 text-center mt-4">
              Harga belum termasuk biaya balik nama
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
