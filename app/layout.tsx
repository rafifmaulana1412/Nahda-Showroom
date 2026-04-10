import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Nahda Showroom - Jual Beli Mobil Bekas Terpercaya",
  description:
    "Temukan mobil bekas berkualitas dengan harga terbaik di Nahda Showroom. Koleksi lengkap, surat resmi, proses mudah.",
  openGraph: {
    title: "Nahda Showroom - Jual Beli Mobil Bekas Terpercaya",
    description:
      "Temukan mobil bekas berkualitas dengan harga terbaik di Nahda Showroom.",
    images: [
      { url: "/logo.png", width: 512, height: 512, alt: "Nahda Showroom" },
    ],
    type: "website",
    siteName: "Nahda Showroom",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nahda Showroom - Jual Beli Mobil Bekas Terpercaya",
    description:
      "Temukan mobil bekas berkualitas dengan harga terbaik di Nahda Showroom.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50 text-gray-800 antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
