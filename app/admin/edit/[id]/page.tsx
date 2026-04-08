"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMobilPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string; // 🔥 FIX UTAMA

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({
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

  // 🔥 FETCH DATA
  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      const res = await fetch(`/api/cars/${id}`);
      const data = await res.json();

      setForm({
        ...data,
        features: data.features?.join(", ") || "",
        images: data.images?.join(", ") || "",
      });

      setPreviewImages(data.images || []);
    };

    getData();
  }, [id]);

  // 🔥 HANDLE INPUT
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (name === "images") {
      const imgs = value
        .split(",")
        .map((i: string) => i.trim())
        .filter((i: string) => i.length > 0);

      const unique = Array.from(new Set<string>(imgs));
      setPreviewImages(unique);
    }
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          year: Number(form.year),
          price: Number(form.price),
          mileage: Number(form.mileage),
          features: form.features,
          images: previewImages,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Mobil berhasil diupdate 🚗");
      router.push("/admin");
      router.refresh();
    } catch {
      toast.error("Gagal update");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto mb-6 flex items-center justify-between">
        <button onClick={() => router.back()} className="text-gray-600">
          ← Kembali
        </button>

        <h1 className="text-2xl font-bold">Edit: {form.name}</h1>

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
                value={form[field.name]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-400"
              />
            </div>
          ))}

          <div className="md:col-span-2">
            <label>Deskripsi</label>
            <textarea
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg"
            />
          </div>

          <div className="md:col-span-2">
            <label>Features</label>
            <input
              name="features"
              value={form.features}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg"
            />
          </div>

          <div className="md:col-span-2">
            <label>Images</label>
            <input
              name="images"
              value={form.images}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-lg"
            />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {previewImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    className="h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg">
              {loading ? "Menyimpan..." : "Update Mobil"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
