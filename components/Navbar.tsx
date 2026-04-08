"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import NahdaLogo from "./NahdaLogo";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/katalog", label: "Katalog Mobil" },
  { href: "/simulasi-kredit", label: "Simulasi Kredit" },
  { href: "/tentang", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <NahdaLogo size={40} />
            <div>
              <p className="font-bold text-gray-900 text-lg">Nahda</p>
              <p className="text-xs text-primary uppercase tracking-widest">
                Showroom
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  pathname === link.href
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-primary hover:bg-orange-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition"
            >
              WhatsApp
            </a>

            {!session ? (
              <Link
                href="/login"
                className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-black transition"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href="/admin"
                  className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary-dark transition"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t px-4 py-3 space-y-2 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-700 hover:text-primary transition"
              >
                {link.label}
              </Link>
            ))}

            {!session ? (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block py-2 text-gray-900 font-semibold"
              >
                Login
              </Link>
            ) : (
              <>
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="block py-2 text-primary font-semibold"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    setOpen(false);
                    signOut();
                  }}
                  className="block py-2 text-red-500 font-semibold"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
