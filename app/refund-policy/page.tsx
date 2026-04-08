export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Kebijakan Refund
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Terakhir diperbarui: 1 Januari 2025
      </p>

      <div className="space-y-6 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Umum</h2>
          <p>
            Nahda Showroom berkomitmen untuk memberikan pengalaman transaksi
            yang transparan dan adil. Kebijakan refund ini menjelaskan kondisi
            dan prosedur pengembalian dana untuk setiap transaksi yang dilakukan
            melalui platform kami.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            2. Kondisi Refund Disetujui
          </h2>
          <p className="mb-2">Pengembalian dana dapat dilakukan apabila:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Unit kendaraan yang dipesan tidak tersedia setelah pembayaran
              dikonfirmasi
            </li>
            <li>
              Terdapat perbedaan signifikan antara kondisi kendaraan yang
              dideskripsikan dengan kondisi aktual
            </li>
            <li>
              Terjadi kesalahan teknis dalam proses pembayaran yang menyebabkan
              double charge
            </li>
            <li>
              Pembatalan oleh pihak Nahda Showroom karena alasan operasional
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            3. Kondisi Refund Tidak Disetujui
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Pembatalan sepihak oleh pembeli setelah unit dikonfirmasi tersedia
            </li>
            <li>
              Pembeli berubah pikiran setelah melakukan test drive dan
              menyetujui kondisi kendaraan
            </li>
            <li>
              Keterlambatan proses administrasi yang disebabkan oleh pembeli
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            4. Prosedur Pengajuan Refund
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              Hubungi tim kami melalui WhatsApp atau email dalam 1x24 jam
              setelah transaksi
            </li>
            <li>
              Sertakan nomor order, bukti pembayaran, dan alasan pengajuan
              refund
            </li>
            <li>Tim kami akan memverifikasi pengajuan dalam 2-3 hari kerja</li>
            <li>Jika disetujui, refund akan diproses dalam 7-14 hari kerja</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            5. Metode Pengembalian Dana
          </h2>
          <p>
            Pengembalian dana akan dilakukan melalui metode pembayaran yang sama
            dengan yang digunakan saat transaksi. Untuk pembayaran via transfer
            bank, dana akan dikembalikan ke rekening asal pengirim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            6. Biaya Administrasi
          </h2>
          <p>
            Untuk pembatalan yang diajukan oleh pembeli (bukan karena kesalahan
            Nahda Showroom), dapat dikenakan biaya administrasi sebesar 2-5%
            dari total pembayaran yang telah dilakukan.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            7. Kontak Refund
          </h2>
          <p>Untuk mengajukan refund atau pertanyaan terkait kebijakan ini:</p>
          <ul className="list-none space-y-1 mt-2">
            <li>Email: refund@nahdashowroom.com</li>
            <li>WhatsApp: +62 812-3456-7890</li>
            <li>Jam operasional: Senin - Sabtu, 08.00 - 18.00 WIB</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
