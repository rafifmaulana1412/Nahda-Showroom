"use client";
import { useState } from "react";

export default function KontakForm() {
  const [form, setForm] = useState({
    nama: "",
    telepon: "",
    email: "",
    keperluan: "tanya-mobil",
    pesan: "",
  });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const msg = encodeURIComponent(
        `Halo Nahda Showroom!\n\nNama: ${form.nama}\nTelepon: ${form.telepon}\nEmail: ${form.email}\nKeperluan: ${form.keperluan}\n\nPesan:\n${form.pesan}`,
      );

      window.open(`https://wa.me/6281234567890?text=${msg}`, "_blank");
      setSent(true);
    } catch {
      setError("Gagal mengirim pesan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm flex flex-col items-center justify-center text-center h-full">
        <span className="text-6xl mb-4">✅</span>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Pesan Terkirim!
        </h3>
        <p className="text-gray-500 mb-6">
          Anda akan diarahkan ke WhatsApp. Tim kami akan segera merespons.
        </p>
        <button onClick={() => setSent(false)} className="btn-outline text-sm">
          Kirim Pesan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-bold text-gray-900 mb-5">Kirim Pesan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Lengkap *
          </label>
          <input
            required
            type="text"
            value={form.nama}
            onChange={(e) => setForm({ ...form, nama: e.target.value })}
            placeholder="Masukkan nama Anda"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
            onChange={(e) => setForm({ ...form, telepon: e.target.value })}
            placeholder="08xx-xxxx-xxxx"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="email@contoh.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keperluan
          </label>
          <select
            value={form.keperluan}
            onChange={(e) => setForm({ ...form, keperluan: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
            onChange={(e) => setForm({ ...form, pesan: e.target.value })}
            placeholder="Tulis pesan Anda di sini..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          />
        </div>
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </div>
        )}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Mengirim..." : "Kirim via WhatsApp"}
        </button>
      </form>
    </div>
  );
}
