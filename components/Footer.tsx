import Link from "next/link";
import NahdaLogo from "./NahdaLogo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <NahdaLogo size={44} />
              <div>
                <p className="font-bold text-white text-lg leading-tight">
                  Nahda
                </p>
                <p className="text-xs text-primary font-medium tracking-widest uppercase">
                  Showroom
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Showroom mobil terpercaya dengan koleksi mobil baru dan bekas
              berkualitas. Melayani dengan jujur dan profesional.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Beranda" },
                { href: "/katalog", label: "Katalog Mobil" },
                { href: "/simulasi-kredit", label: "Simulasi Kredit" },
                { href: "/tentang", label: "Tentang Kami" },
                { href: "/faq", label: "FAQ" },
                { href: "/kontak", label: "Kontak" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-white font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Jual Mobil Bekas</li>
              <li>Tukar Tambah</li>
              <li>Kredit Mobil</li>
              <li>Test Drive</li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-primary mt-0.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-gray-400">
                  Jl. HOS. Cokroaminoto, Heledulaa, Kec. Kota Tim., Kota
                  Gorontalo, Gorontalo 96119
                </span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-primary shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/6289677332497"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  +62 896-7733-2497
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-primary shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:info@nahdashowroom.com"
                  className="text-gray-400 hover:text-primary transition-colors"
                >
                  faadelgani14@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 mt-10 pt-6">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Syarat & Ketentuan
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-primary transition-colors"
            >
              Kebijakan Refund
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="/kontak"
              className="hover:text-primary transition-colors"
            >
              Hubungi Kami
            </Link>
            <Link href="/faq" className="hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Nahda Showroom. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
