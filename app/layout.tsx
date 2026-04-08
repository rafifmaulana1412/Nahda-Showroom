"use client";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Provider";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-800 antialiased">
        <Providers>
          <Navbar />

          {/* 🔥 ANIMASI HALAMAN */}
          <AnimatePresence mode="wait">
            <motion.main
              key={pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.main>
          </AnimatePresence>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
