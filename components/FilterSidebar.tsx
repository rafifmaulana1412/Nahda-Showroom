"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FilterParams } from "@/lib/types";
import { useCallback } from "react";

interface Props {
  currentFilters: FilterParams;
}

export default function FilterSidebar({ currentFilters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "semua" || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`/katalog?${params.toString()}`);
    },
    [router, searchParams],
  );

  const clearAll = () => router.push("/katalog");

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-6 sticky top-20">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filter</h3>
        <button
          onClick={clearAll}
          className="text-xs text-primary hover:underline"
        >
          Reset Semua
        </button>
      </div>

      {/* Search */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cari Mobil
        </label>
        <input
          type="text"
          placeholder="Nama mobil, lokasi..."
          defaultValue={currentFilters.search || ""}
          onChange={(e) => updateFilter("cari", e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      {/* Harga */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rentang Harga
        </label>
        <select
          onChange={(e) => {
            const [min, max] = e.target.value.split("-");
            const params = new URLSearchParams(searchParams.toString());
            if (min) params.set("harga_min", min);
            else params.delete("harga_min");
            if (max) params.set("harga_max", max);
            else params.delete("harga_max");
            router.push(`/katalog?${params.toString()}`);
          }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        >
          <option value="-">Semua Harga</option>
          <option value="-100000000">Di bawah Rp 100 Juta</option>
          <option value="100000000-200000000">Rp 100 - 200 Juta</option>
          <option value="200000000-300000000">Rp 200 - 300 Juta</option>
          <option value="300000000-500000000">Rp 300 - 500 Juta</option>
          <option value="500000000-">Di atas Rp 500 Juta</option>
        </select>
      </div>
    </div>
  );
}
