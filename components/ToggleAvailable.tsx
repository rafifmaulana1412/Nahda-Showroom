"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ToggleAvailable({
  carId,
  isAvailable,
}: {
  carId: string;
  isAvailable: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(isAvailable);
  const router = useRouter();

  const toggle = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/cars/${carId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !status }),
      });
      if (res.ok) {
        setStatus(!status);
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
        status
          ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600"
          : "bg-red-100 text-red-600 hover:bg-green-100 hover:text-green-700"
      } ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      title={status ? "Klik untuk tandai Terjual" : "Klik untuk tandai Ready"}
    >
      {loading ? "..." : status ? "Ready" : "Terjual"}
    </button>
  );
}
