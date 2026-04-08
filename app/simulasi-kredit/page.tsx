import KreditSimulator from "@/components/KreditSimulator";

export default function SimulasiKreditPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Simulasi Kredit Mobil
        </h1>
        <p className="text-gray-500">
          Hitung estimasi cicilan bulanan Anda dengan mudah
        </p>
      </div>
      <KreditSimulator />
      <div className="mt-8 bg-orange-50 border border-orange-200 rounded-2xl p-5 text-sm text-gray-600">
        <p className="font-semibold text-gray-800 mb-2">⚠️ Catatan Penting</p>
        <ul className="space-y-1 list-disc list-inside text-gray-500">
          <li>Simulasi ini hanya perkiraan, bukan penawaran resmi kredit</li>
          <li>
            Bunga aktual dapat berbeda tergantung lembaga keuangan dan profil
            kredit
          </li>
          <li>Hubungi kami untuk mendapatkan penawaran kredit terbaik</li>
        </ul>
      </div>
    </div>
  );
}
