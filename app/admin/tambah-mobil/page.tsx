"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function TambahMobilPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    mileage: "",
    color: "",
    location: "",
    contactPerson: "",
    description: "",
    features: "",
    images: "",
  });

  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer admin-token-123",
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
          features: form.features,
          images: previewImages, // 🔥 pakai hasil upload
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal tambah mobil");
        setLoading(false);
        return;
      }

      toast.success("Mobil berhasil ditambahkan 🚗");

      router.push("/admin");
      router.refresh();
    } catch (err) {
      toast.error("Terjadi kesalahan");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
        >
          ← Kembali
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Tambah Mobil</h1>
        <div />
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-5">
          {[
            { name: "name", label: "Nama Mobil" },
            { name: "brand", label: "Brand" },
            { name: "model", label: "Model" },
            { name: "year", label: "Tahun" },
            { name: "price", label: "Harga" },
            { name: "mileage", label: "KM" },
            { name: "color", label: "Warna" },
            { name: "location", label: "Lokasi" },
            { name: "contactPerson", label: "Kontak" },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                type="text"
                name={field.name}
                value={(form as any)[field.name]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          ))}

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Deskripsi</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* FEATURES */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">
              Features (pisah koma)
            </label>
            <input
              type="text"
              name="features"
              value={form.features}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          {/* 🔥 UPLOAD GAMBAR */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-600">Gambar Mobil</label>

            <label className="mt-2 inline-block cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
              Upload Gambar
              <input
                type="file"
                multiple
                className="hidden"
                onChange={async (e) => {
                  const files = e.target.files;
                  if (!files) return;

                  let urls: string[] = [];

                  for (let file of Array.from(files)) {
                    const formData = new FormData();
                    formData.append("file", file); // 🔥 HARUS "file"

                    const res = await fetch("/api/upload", {
                      method: "POST",
                      body: formData,
                    });

                    const data = await res.json();

                    console.log("UPLOAD FRONTEND:", data);

                    if (data.secure_url) {
                      urls.push(data.secure_url);
                    }
                  }

                  setPreviewImages(urls);
                }}
              />
            </label>

            {/* PREVIEW */}
            {previewImages.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-3">
                {previewImages.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={img}
                      className="w-full h-24 object-cover rounded-lg border"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = previewImages.filter(
                          (_, index) => index !== i,
                        );
                        setPreviewImages(updated);
                      }}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan Mobil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
