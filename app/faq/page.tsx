"use client";
import { useState } from "react";

const faqs = [
  {
    q: "Bagaimana cara membeli mobil di Nahda Showroom?",
    a: "Pilih mobil yang Anda inginkan di katalog, klik 'Tanya via WhatsApp', dan tim kami akan memandu proses pembelian dari awal hingga selesai.",
  },
  {
    q: "Apakah bisa test drive sebelum membeli?",
    a: "Tentu bisa. Hubungi kami untuk menjadwalkan test drive. Tersedia setiap hari Senin-Sabtu pukul 08.00-17.00 WIB.",
  },
  {
    q: "Apakah tersedia fasilitas kredit?",
    a: "Ya, kami bekerja sama dengan berbagai lembaga keuangan terpercaya. Gunakan fitur Simulasi Kredit di website kami untuk estimasi cicilan, lalu hubungi kami untuk pengajuan resmi.",
  },
  {
    q: "Bagaimana dengan garansi mobil bekas?",
    a: "Setiap mobil bekas telah melalui inspeksi 50+ titik. Kami memberikan garansi mesin 30 hari untuk setiap unit bekas yang dibeli.",
  },
  {
    q: "Apakah bisa tukar tambah kendaraan lama?",
    a: "Bisa. Bawa kendaraan Anda ke showroom untuk penilaian harga. Proses tukar tambah biasanya selesai dalam 1 hari kerja.",
  },
  {
    q: "Berapa lama proses balik nama STNK/BPKB?",
    a: "Proses balik nama membutuhkan waktu 14-30 hari kerja tergantung wilayah. Kami membantu mengurus seluruh proses administrasi.",
  },
  {
    q: "Metode pembayaran apa saja yang diterima?",
    a: "Kami menerima transfer bank, kartu kredit/debit, QRIS, dan virtual account melalui payment gateway DOKU.",
  },
  {
    q: "Bagaimana jika saya ingin membatalkan pemesanan?",
    a: "Pembatalan dapat dilakukan sebelum pembayaran lunas. Silakan baca Kebijakan Refund kami untuk detail lebih lanjut.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">FAQ</h1>
        <p className="text-gray-500">Pertanyaan yang sering ditanyakan</p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
            >
              <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
              <svg
                className={`w-5 h-5 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {open === i && (
              <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 bg-orange-50 rounded-2xl p-6 text-center">
        <p className="text-gray-700 font-medium mb-2">Masih ada pertanyaan?</p>
        <a
          href="https://wa.me/6281234567890?text=Halo%20Nahda%20Showroom%2C%20saya%20ingin%20bertanya"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-block"
        >
          Chat WhatsApp
        </a>
      </div>
    </div>
  );
}
