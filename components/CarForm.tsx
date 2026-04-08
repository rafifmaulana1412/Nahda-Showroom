"use client";
import { useState } from "react";

interface CarFormData {
  name: string;
  brand: string;
  model: string;
  year: string;
  price: string;
  condition: string;
  transmission: string;
  fuel: string;
  mileage: string;
  color: string;
  images: string;
  description: string;
  features: string;
  location: string;
  contactPerson: string;
  paymentMethods: string;
  isAvailable: boolean;
  isFeatured: boolean;
}

const initialForm: CarFormData = {
  name: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  condition: "bekas",
  transmission: "manual",
  fuel: "bensin",
  mileage: "0",
  color: "",
  images: "",
  description: "",
  features: "",
  location: "",
  contactPerson: "",
  paymentMethods: "",
  isAvailable: true,
  isFeatured: false,
};

export default function CarForm({
  defaultValues,
  carId,
}: {
  defaultValues?: Partial<CarFormData>;
  carId?: string;
}) {
  const initialState = { ...initialForm, ...defaultValues };
  const [form, setForm] = useState<CarFormData>(initialState);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const set = (key: keyof CarFormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toArray = (val: string) =>
    val
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrls: string[] = uploadedImages;

      const payload = {
        ...form,
        year: Number(form.year),
        price: Number(form.price),
        mileage: Number(form.mileage),
        images: imageUrls,
        features: toArray(form.features),
        paymentMethods: toArray(form.paymentMethods),
      };

      const res = await fetch(carId ? `/api/cars/${carId}` : "/api/cars", {
        method: carId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error();

      setSaved(true);
    } catch {
      setError("Gagal simpan");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Nama" onChange={(e) => set("name", e.target.value)} />
      <input
        placeholder="Brand"
        onChange={(e) => set("brand", e.target.value)}
      />
      <input
        placeholder="Model"
        onChange={(e) => set("model", e.target.value)}
      />
      <input
        placeholder="Tahun"
        onChange={(e) => set("year", e.target.value)}
      />
      <input
        placeholder="Harga"
        onChange={(e) => set("price", e.target.value)}
      />
      <input
        placeholder="KM"
        onChange={(e) => set("mileage", e.target.value)}
      />
      <input
        placeholder="Warna"
        onChange={(e) => set("color", e.target.value)}
      />

      {/* 🔥 TOMBOL UPLOAD */}
      <div>
        <p className="text-sm font-medium mb-1">Gambar Mobil</p>

        <label className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition inline-block">
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
                formData.append("file", file);

                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formData,
                });

                const data = await res.json();
                urls.push(data.secure_url);
              }

              setUploadedImages(urls);
            }}
          />
        </label>

        {/* 🔥 PREVIEW */}
        {uploadedImages.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {uploadedImages.map((img, i) => (
              <img
                key={i}
                src={img}
                className="h-20 w-20 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      <textarea
        placeholder="Deskripsi"
        onChange={(e) => set("description", e.target.value)}
      />

      <input
        placeholder="Features (pisah koma)"
        onChange={(e) => set("features", e.target.value)}
      />

      <input
        placeholder="Lokasi"
        onChange={(e) => set("location", e.target.value)}
      />

      <input
        placeholder="Kontak"
        onChange={(e) => set("contactPerson", e.target.value)}
      />

      <button type="submit">Simpan</button>

      {saved && <p className="text-green-600">✅ Berhasil disimpan</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
