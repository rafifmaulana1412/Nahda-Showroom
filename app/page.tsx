import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CarCard from "@/components/CarCard";
import NahdaLogo from "@/components/NahdaLogo";

const stats = [
  { label: "Mobil Tersedia", value: "200+" },
  { label: "Pelanggan Puas", value: "1.500+" },
  { label: "Tahun Pengalaman", value: "10+" },
  { label: "Merk Tersedia", value: "20+" },
];

const categories = [
  {
    label: "Mobil Bekas",
    icon: "🔑",
    href: "/katalog?kondisi=bekas",
    desc: "Terawat & bergaransi",
  },
  {
    label: "Tukar Tambah",
    icon: "🔄",
    href: "/kontak",
    desc: "Proses mudah & cepat",
  },
  {
    label: "Simulasi Kredit",
    icon: "💳",
    href: "/simulasi-kredit",
    desc: "Cicilan ringan",
  },
  {
    label: "Test Drive",
    icon: "🏁",
    href: "/kontak",
    desc: "Coba sebelum beli",
  },
];

const testimonials = [
  {
    name: "Budi Santoso",
    text: "Pelayanan sangat ramah dan profesional. Mobil yang saya beli kondisinya sesuai deskripsi. Recommended!",
    rating: 5,
  },
  {
    name: "Siti Rahayu",
    text: "Proses kredit cepat dan mudah. Staf Nahda Showroom sangat membantu dari awal sampai selesai.",
    rating: 5,
  },
  {
    name: "Ahmad Fauzi",
    text: "Harga kompetitif, pilihan banyak. Sudah 2 kali beli mobil di sini dan selalu puas.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-primary/20 text-primary text-sm font-medium px-3 py-1 rounded-full border border-primary/30">
                  #1 Showroom Terpercaya
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Temukan Mobil <span className="text-primary">Impian</span> Anda
                di Nahda Showroom
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Koleksi mobil baru dan bekas berkualitas dengan harga terbaik.
                Proses mudah, pelayanan profesional, dan kepuasan pelanggan
                adalah prioritas kami.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/katalog" className="btn-primary text-base">
                  Lihat Katalog
                </Link>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Nahda%20Showroom%2C%20saya%20ingin%20konsultasi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-base border-white text-white hover:bg-white hover:text-gray-900"
                >
                  Konsultasi Gratis
                </a>
              </div>
            </div>

            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 bg-primary/20 rounded-full flex items-center justify-center border border-primary/30">
                  <NahdaLogo size={180} />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 rounded-2xl p-4 shadow-xl">
                  <p className="text-2xl font-bold text-primary">200+</p>
                  <p className="text-xs text-gray-500">Unit Tersedia</p>
                </div>
                <div className="absolute -top-4 -left-4 bg-white text-gray-900 rounded-2xl p-4 shadow-xl">
                  <p className="text-2xl font-bold text-primary">10+</p>
                  <p className="text-xs text-gray-500">Tahun Pengalaman</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-primary">{s.value}</p>
                  <p className="text-sm text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Layanan Kami
            </h2>
            <p className="text-gray-500">
              Semua kebutuhan mobil Anda tersedia di sini
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="flex flex-col items-center p-5 rounded-2xl border-2 border-gray-100 hover:border-primary hover:bg-orange-50 transition-all duration-200 group text-center"
              >
                <span className="text-4xl mb-3">{cat.icon}</span>
                <p className="font-semibold text-gray-800 group-hover:text-primary text-sm">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Mengapa Nahda Showroom?
            </h2>
            <p className="text-gray-500">
              Kepercayaan Anda adalah prioritas utama kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✅",
                title: "Terpercaya & Transparan",
                desc: "Setiap mobil telah melalui inspeksi ketat. Kami memberikan informasi lengkap dan jujur tentang kondisi kendaraan.",
              },
              {
                icon: "💰",
                title: "Harga Terbaik",
                desc: "Harga kompetitif tanpa biaya tersembunyi. Kami memastikan Anda mendapatkan nilai terbaik untuk setiap rupiah.",
              },
              {
                icon: "🤝",
                title: "Layanan Purna Jual",
                desc: "Dukungan after-sales yang responsif. Kami siap membantu Anda bahkan setelah transaksi selesai.",
              },
              {
                icon: "📋",
                title: "Surat Lengkap",
                desc: "Semua dokumen kendaraan lengkap dan resmi. BPKB, STNK, dan faktur tersedia untuk setiap unit.",
              },
              {
                icon: "🏦",
                title: "Kemudahan Kredit",
                desc: "Bekerja sama dengan berbagai lembaga keuangan terpercaya untuk memberikan opsi kredit terbaik.",
              },
              {
                icon: "🔄",
                title: "Tukar Tambah",
                desc: "Layanan tukar tambah dengan proses cepat dan harga yang fair untuk kendaraan lama Anda.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-orange-50 transition-colors"
              >
                <span className="text-3xl shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Kata Pelanggan Kami
            </h2>
            <p className="text-gray-500">
              Kepuasan pelanggan adalah kebanggaan kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <p className="font-semibold text-gray-900 text-sm">
                  — {t.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Menemukan Mobil Impian Anda?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Hubungi kami sekarang dan dapatkan konsultasi gratis dari tim ahli
            kami
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/katalog"
              className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors"
            >
              Lihat Katalog
            </Link>
            <a
              href="https://wa.me/62289677332497?text=Halo%20Nahda%20Showroom%2C%20saya%20ingin%20konsultasi%20mobil"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
