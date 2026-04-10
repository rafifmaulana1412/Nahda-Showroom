"use client";
import { useState } from "react";

export default function KontakForm({ carId }: { carId?: string }) {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    email: "",
    keperluan: "tanya-mobil",
    pesan: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const set = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, carId: carId || null }),
      });

      if (!res.ok) throw new Error();

      setStatus("success");

      // Juga buka WA setelah tersimpan ke DB
      const msg = encodeURIComponent(
        `Halo Nahda Showroom!\n\nNama: ${form.nama}\nTelepon: ${form.telepon}\nKeperluan: ${form.keperluan}\n\nPesan:\n${form.pesan}`,
      );
      window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center h-full">
        <span className="text-6xl mb-4">✅</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Pesan Terkirim!
        </h3>
        <p className="text-gray-500 mb-6">
          Pesan Anda sudah tersimpan dan kami akan segera merespons via
          WhatsApp.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({
              nama: "",
              telepon: "",
              email: "",
              keperluan: "tanya-mobil",
              pesan: "",
            });
          }}
          className="btn-outline text-sm"
        >
          Kirim Pesan Lain
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-gray-900 mb-5">Kirim Pesan</h2>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm mb-4">
          Gagal mengirim pesan. Coba lagi.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap *
          </label>
          <input
            required
            type="text"
            value={form.nama}
            onChange={(e) => set("nama", e.target.value)}
            placeholder="Masukkan nama Anda"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nomor Telepon *
          </label>
          <input
            required
            type="tel"
            value={form.telepon}
            onChange={(e) => set("telepon", e.target.value)}
            placeholder="08xx-xxxx-xxxx"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="email@contoh.com"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keperluan
          </label>
          <select
            value={form.keperluan}
            onChange={(e) => set("keperluan", e.target.value)}
            className={inputClass}
          >
            <option value="tanya-mobil">Tanya Mobil</option>
            <option value="test-drive">Jadwalkan Test Drive</option>
            <option value="kredit">Pengajuan Kredit</option>
            <option value="tukar-tambah">Tukar Tambah</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pesan *
          </label>
          <textarea
            required
            rows={4}
            value={form.pesan}
            onChange={(e) => set("pesan", e.target.value)}
            placeholder="Tulis pesan Anda di sini..."
            className={`${inputClass} resize-none`}
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
        </button>
      </form>
    </div>
  );
}
