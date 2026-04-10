import Link from "next/link";
import NahdaLogo from "@/components/NahdaLogo";
import { prisma } from "@/lib/prisma";
import AdminLogout from "@/components/AdminLogout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const unreadCount = await prisma.contact.count({ where: { isRead: false } });

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <NahdaLogo size={32} />
          <span className="font-semibold">Admin Panel</span>
          <span className="text-gray-500 text-sm hidden md:inline">
            · Nahda Showroom
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Link
            href="/admin"
            className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/tambah-mobil"
            className="px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Tambah Mobil
          </Link>
          <Link
            href="/admin/pesan"
            className="relative px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Pesan
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>
          <Link
            href="/"
            className="px-3 py-2 rounded-lg text-primary hover:text-primary-light hover:bg-white/10 transition-colors"
          >
            ← Website
          </Link>
          <AdminLogout />
        </div>
      </nav>
      {children}
    </div>
  );
}
