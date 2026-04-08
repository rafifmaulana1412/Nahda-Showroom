"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCarButton({ carId }: { carId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus mobil ini?")) return;
    setIsDeleting(true);

    const response = await fetch(`/api/cars/${carId}`, {
      method: "DELETE",
    });

    setIsDeleting(false);

    if (response.ok) {
      router.refresh();
    } else {
      alert("Gagal menghapus mobil. Coba lagi.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-xs text-red-600 hover:underline"
    >
      {isDeleting ? "Menghapus..." : "Hapus"}
    </button>
  );
}
