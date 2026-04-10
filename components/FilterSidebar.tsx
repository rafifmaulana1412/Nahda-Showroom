"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function FilterSidebar({
  currentFilters,
}: {
  currentFilters: Record<string, string | undefined>;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "semua") params.delete(key);
      else params.set(key, value);
      router.push(`/katalog?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearAll = () => router.push("/katalog");

  const activeCount = [
    "cari",
    "harga_min",
    "harga_max",
    "transmisi",
    "kondisi",
    "tahun_min",
    "tahun_max",
  ].filter((k) => searchParams.get(k)).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-5 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filter</h3>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Reset ({activeCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
          Cari Mobil
        </label>
        <input
          type="text"
          placeholder="Nama, merk, model..."
          defaultValue={searchParams.get("cari") || ""}
          onChange={(e) => update("cari", e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      {/* Kondisi */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
          Kondisi
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {["semua", "bekas", "baru"].map((v) => (
            <button
              key={v}
              onClick={() => update("kondisi", v)}
              className={`py-2 text-xs rounded-xl border font-medium transition-all capitalize ${
                (searchParams.get("kondisi") || "semua") === v
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {v === "semua" ? "Semua" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transmisi */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
          Transmisi
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {["semua", "matic", "manual"].map((v) => (
            <button
              key={v}
              onClick={() => update("transmisi", v)}
              className={`py-2 text-xs rounded-xl border font-medium transition-all ${
                (searchParams.get("transmisi") || "semua") === v
                  ? "bg-primary text-white border-primary shadow-sm"
                  : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
              }`}
            >
              {v === "semua" ? "Semua" : v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Harga */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
          Rentang Harga
        </label>
        <select
          defaultValue=""
          onChange={(e) => {
            const [min, max] = e.target.value.split("-");
            const params = new URLSearchParams(searchParams.toString());
            if (min) params.set("harga_min", min);
            else params.delete("harga_min");
            if (max) params.set("harga_max", max);
            else params.delete("harga_max");
            router.push(`/katalog?${params.toString()}`);
          }}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="-">Semua Harga</option>
          <option value="-100000000">Di bawah Rp 100 Juta</option>
          <option value="100000000-200000000">Rp 100 - 200 Juta</option>
          <option value="200000000-300000000">Rp 200 - 300 Juta</option>
          <option value="300000000-500000000">Rp 300 - 500 Juta</option>
          <option value="500000000-">Di atas Rp 500 Juta</option>
        </select>
      </div>

      {/* Tahun */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">
          Tahun
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            min="2000"
            max="2025"
            defaultValue={searchParams.get("tahun_min") || ""}
            onChange={(e) => update("tahun_min", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
          <input
            type="number"
            placeholder="Max"
            min="2000"
            max="2025"
            defaultValue={searchParams.get("tahun_max") || ""}
            onChange={(e) => update("tahun_max", e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
}
