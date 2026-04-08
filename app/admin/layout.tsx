import Link from "next/link";
import NahdaLogo from "@/components/NahdaLogo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NahdaLogo size={32} />
          <span className="font-semibold">Admin Panel</span>
          <span className="text-gray-500 text-sm">· Nahda Showroom</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/admin"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/tambah-mobil"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Tambah Mobil
          </Link>
          <Link
            href="/"
            className="text-primary hover:text-primary-light transition-colors"
          >
            ← Lihat Website
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
