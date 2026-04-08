export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Kebijakan Privasi
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Terakhir diperbarui: 1 Januari 2025
      </p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            1. Pendahuluan
          </h2>
          <p>
            Nahda Showroom menghormati privasi Anda dan berkomitmen untuk
            melindungi data pribadi yang Anda berikan kepada kami. Kebijakan
            privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
            dan melindungi informasi Anda.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Data yang Kami Kumpulkan
          </h2>
          <p className="mb-2">Kami dapat mengumpulkan data berikut:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Nama lengkap</li>
            <li>Nomor telepon / WhatsApp</li>
            <li>Alamat email</li>
            <li>Alamat pengiriman dokumen</li>
            <li>Data transaksi dan riwayat pembelian</li>
            <li>Data teknis seperti IP address dan jenis browser (otomatis)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Penggunaan Data
          </h2>
          <p className="mb-2">Data Anda kami gunakan untuk:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Memproses transaksi pembelian kendaraan</li>
            <li>Menghubungi Anda terkait pesanan dan layanan</li>
            <li>Mengirimkan informasi promosi (dengan persetujuan Anda)</li>
            <li>Meningkatkan kualitas layanan kami</li>
            <li>Memenuhi kewajiban hukum yang berlaku</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Keamanan Data
          </h2>
          <p>
            Kami menggunakan enkripsi SSL/TLS untuk melindungi data yang
            ditransmisikan melalui website kami. Data disimpan di server yang
            aman dan hanya dapat diakses oleh personel yang berwenang.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Berbagi Data dengan Pihak Ketiga
          </h2>
          <p className="mb-2">
            Kami tidak menjual data pribadi Anda. Data dapat dibagikan kepada:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Penyedia layanan pembayaran (untuk memproses transaksi)</li>
            <li>Lembaga keuangan (untuk proses kredit, jika diperlukan)</li>
            <li>Otoritas hukum (jika diwajibkan oleh hukum)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Hak Anda
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Mengakses data pribadi yang kami simpan tentang Anda</li>
            <li>Meminta koreksi data yang tidak akurat</li>
            <li>Meminta penghapusan data Anda</li>
            <li>Menarik persetujuan penggunaan data kapan saja</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Cookie
          </h2>
          <p>
            Website kami menggunakan cookie untuk meningkatkan pengalaman
            pengguna. Anda dapat mengatur browser untuk menolak cookie, namun
            beberapa fitur website mungkin tidak berfungsi optimal.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            8. Kontak
          </h2>
          <p>Untuk pertanyaan terkait privasi data Anda:</p>
          <ul className="list-none space-y-1 mt-2">
            <li>Email: privacy@nahdashowroom.com</li>
            <li>WhatsApp: +62 812-3456-7890</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
