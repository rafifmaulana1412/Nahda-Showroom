import NahdaLogo from "@/components/NahdaLogo";

export default function TentangPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <NahdaLogo size={100} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tentang Nahda Showroom
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
          Showroom mobil terpercaya yang telah melayani ribuan pelanggan dengan
          penuh kejujuran dan profesionalisme sejak 2014.
        </p>
      </div>

      {/* Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cerita Kami</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              Nahda Showroom didirikan pada tahun 2014 dengan visi sederhana:
              menjadi showroom mobil yang paling dipercaya di Indonesia. Berawal
              dari showroom kecil dengan hanya 10 unit, kini kami telah
              berkembang menjadi salah satu showroom terkemuka dengan ratusan
              unit tersedia.
            </p>
            <p>
              Nama "Nahda" berasal dari bahasa Arab yang berarti "kebangkitan" —
              mencerminkan semangat kami untuk terus berkembang dan memberikan
              yang terbaik bagi pelanggan.
            </p>
            <p>
              Kami percaya bahwa membeli mobil adalah keputusan besar. Itulah
              mengapa kami berkomitmen untuk memberikan informasi yang
              transparan, harga yang fair, dan layanan yang tulus.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "10+", label: "Tahun Pengalaman" },
            { value: "1.500+", label: "Pelanggan Puas" },
            { value: "200+", label: "Unit Tersedia" },
            { value: "20+", label: "Merk Tersedia" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-orange-50 rounded-2xl p-6 text-center"
            >
              <p className="text-3xl font-bold text-primary mb-1">{s.value}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Nilai-Nilai Kami
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🤝",
              title: "Kejujuran",
              desc: "Kami selalu memberikan informasi yang jujur dan transparan tentang setiap kendaraan yang kami jual.",
            },
            {
              icon: "⭐",
              title: "Kualitas",
              desc: "Setiap mobil melewati inspeksi ketat sebelum dipajang. Kami hanya menjual yang terbaik.",
            },
            {
              icon: "❤️",
              title: "Kepedulian",
              desc: "Pelanggan bukan sekadar transaksi. Kami membangun hubungan jangka panjang yang bermakna.",
            },
          ].map((v) => (
            <div
              key={v.title}
              className="text-center p-6 bg-white rounded-2xl shadow-sm"
            >
              <span className="text-5xl block mb-4">{v.icon}</span>
              <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Tim Kami
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Ahmad Nahda", role: "Founder & CEO" },
            { name: "Siti Aminah", role: "Sales Manager" },
            { name: "Rizky Pratama", role: "Head of Finance" },
            { name: "Dewi Lestari", role: "Customer Service" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">👤</span>
              </div>
              <p className="font-semibold text-gray-900 text-sm">
                {member.name}
              </p>
              <p className="text-xs text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
