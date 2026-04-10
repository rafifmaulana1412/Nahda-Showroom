"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MarkReadButton({ contactId }: { contactId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const markRead = async () => {
    setLoading(true);
    await fetch(`/api/contacts/${contactId}/read`, { method: "PATCH" });
    setLoading(false);
    router.refresh();
  };

  return (
    <button
      onClick={markRead}
      disabled={loading}
      className="inline-flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      {loading ? "..." : "Tandai Dibaca"}
    </button>
  );
}
