"use client";
import { useState, useMemo } from "react";

export default function KreditSimulator() {
  const [harga, setHarga] = useState(200000000);
  const [dp, setDp] = useState(20);
  const [tenor, setTenor] = useState(36);
  const [bunga, setBunga] = useState(6);

  const result = useMemo(() => {
    const dpAmount = (harga * dp) / 100;
    const pinjaman = harga - dpAmount;
    const bungaPerBulan = bunga / 100 / 12;
    const cicilan =
      bungaPerBulan === 0
        ? pinjaman / tenor
        : (pinjaman * bungaPerBulan * Math.pow(1 + bungaPerBulan, tenor)) /
          (Math.pow(1 + bungaPerBulan, tenor) - 1);
    const totalBayar = cicilan * tenor + dpAmount;
    return { dpAmount, pinjaman, cicilan, totalBayar };
  }, [harga, dp, tenor, bunga]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Input */}
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Harga Mobil:{" "}
              <span className="text-primary font-bold">{fmt(harga)}</span>
            </label>
            <input
              type="range"
              min={50000000}
              max={1000000000}
              step={5000000}
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Rp 50 Juta</span>
              <span>Rp 1 Miliar</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uang Muka (DP):{" "}
              <span className="text-primary font-bold">{dp}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={70}
              step={5}
              value={dp}
              onChange={(e) => setDp(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>10%</span>
              <span>70%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tenor
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[12, 24, 36, 48, 60, 72].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenor(t)}
                  className={`py-2 text-sm rounded-lg border font-medium transition-colors ${
                    tenor === t
                      ? "bg-primary text-white border-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary"
                  }`}
                >
                  {t} bln
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bunga per Tahun:{" "}
              <span className="text-primary font-bold">{bunga}%</span>
            </label>
            <input
              type="range"
              min={3}
              max={15}
              step={0.5}
              value={bunga}
              onChange={(e) => setBunga(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>3%</span>
              <span>15%</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="bg-gray-900 p-6 flex flex-col justify-center">
          <h3 className="text-white font-semibold mb-6 text-lg">
            Hasil Simulasi
          </h3>
          <div className="space-y-4">
            {[
              { label: "Harga Mobil", value: fmt(harga) },
              { label: `Uang Muka (${dp}%)`, value: fmt(result.dpAmount) },
              { label: "Jumlah Pinjaman", value: fmt(result.pinjaman) },
              { label: `Tenor`, value: `${tenor} Bulan` },
              { label: "Bunga per Tahun", value: `${bunga}%` },
            ].map((item) => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
            <div className="border-t border-gray-700 pt-4 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 font-medium">
                  Cicilan per Bulan
                </span>
                <span className="text-primary font-bold text-xl">
                  {fmt(result.cicilan)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Pembayaran</span>
                <span className="text-gray-300">{fmt(result.totalBayar)}</span>
              </div>
            </div>
          </div>
          <a
            href={`https://wa.me/6281234567890?text=Halo%20Nahda%20Showroom%2C%20saya%20ingin%20mengajukan%20kredit%20mobil%20dengan%20harga%20${fmt(harga)}%2C%20DP%20${dp}%25%2C%20tenor%20${tenor}%20bulan`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 btn-primary text-center block"
          >
            Ajukan Kredit via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
