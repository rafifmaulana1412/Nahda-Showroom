import KontakForm from "@/components/KontakForm";

export default function KontakPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hubungi Kami</h1>
        <p className="text-gray-500">
          Kami siap membantu Anda menemukan mobil impian
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-4">Informasi Kontak</h2>
            <div className="space-y-4">
              {[
                {
                  icon: "📍",
                  label: "Alamat",
                  value:
                    "Jl. HOS. Cokroaminoto, Heledulaa, Kec. Kota Tim., Kota Gorontalo, Gorontalo 96119",
                },
                { icon: "📞", label: "Telepon", value: "+62 896-7733-2497" },
                { icon: "✉️", label: "Email", value: "faadelgani14@gmail.com" },
                {
                  icon: "🕐",
                  label: "Jam Operasional",
                  value:
                    "Senin - Sabtu: 08.30 - 19.30 WIB\nMinggu: 12.00 - 16.30 WIB",
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/6289677332497?text=Halo%20Nahda%20Showroom%2C%20saya%20ingin%20bertanya"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 transition-colors"
          >
            <svg
              className="w-10 h-10 shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <div>
              <p className="font-bold text-lg">Chat WhatsApp</p>
              <p className="text-green-100 text-sm">
                Respon cepat, siap membantu
              </p>
            </div>
          </a>

          {/* Map placeholder */}
          <div className="bg-gray-200 rounded-2xl h-48 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p className="text-3xl mb-2">🗺️</p>
              <p className="text-sm">Google Maps</p>
              <p className="text-xs">
                Jl. HOS. Cokroaminoto, Heledulaa, Kec. Kota Tim., Kota
                Gorontalo, Gorontalo 96119
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <KontakForm />
      </div>
    </div>
  );
}
