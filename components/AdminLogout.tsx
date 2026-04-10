"use client";
import { signOut } from "next-auth/react";

export default function AdminLogout() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="px-3 py-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors text-sm"
    >
      Logout
    </button>
  );
}
