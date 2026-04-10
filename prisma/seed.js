const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin.nahda123@gmail.com" },
    update: {
      password,
      role: "admin",
    },
    create: {
      email: "admin.nahda123@gmail.com",
      password,
      role: "admin",
    },
  });

  await prisma.car.upsert({
    where: { id: "sample-car-1" },
    update: {
      name: "Toyota Fortuner VRZ 4x2 AT 2024",
      brand: "Toyota",
      model: "Fortuner",
      year: 2024,
      price: 650000000,
      condition: "bekas",
      transmission: "matic",
      fuel: "bensin",
      mileage: 18000,
      color: "Hitam",
      location: "Gorontalo",
      description:
        "Toyota Fortuner VRZ 4x2 AT 2024. KM 18rb asli record. Pajak hidup panjang Februari 2027. Service resmi lengkap. Tangan pertama dari baru. Body mulus, no minus. Interior bersih dan wangi. Mesin halus, kaki-kaki senyap. Ban tebal 95%. Surat-surat lengkap & siap balik nama. Ready stock, siap inspeksi. Harga Rp 650 juta nego tipis. Lokasi Gorontalo. Bisa cash / kredit / booking fee online. Hubungi: 0896-7733-2497.",
      features: [
        "KM 18rb asli record",
        "Pajak hidup panjang Februari 2027",
        "Service resmi lengkap",
        "Tangan pertama dari baru",
        "Body mulus, no minus",
        "Interior bersih dan wangi",
        "Mesin halus, kaki-kaki senyap",
        "Ban tebal 95%",
        "Surat-surat lengkap & siap balik nama",
        "Ready stock, siap inspeksi",
        "Cash / kredit / booking fee online",
      ],
      images: [
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
      ],
      paymentMethods: ["Cash", "Kredit", "Booking Fee Online"],
      isFeatured: true,
      isAvailable: true,
    },
    create: {
      id: "sample-car-1",
      name: "Toyota Fortuner VRZ 4x2 AT 2024",
      brand: "Toyota",
      model: "Fortuner",
      year: 2024,
      price: 650000000,
      condition: "bekas",
      transmission: "matic",
      fuel: "bensin",
      mileage: 18000,
      color: "Hitam",
      location: "Gorontalo",
      description:
        "Toyota Fortuner VRZ 4x2 AT 2024. KM 18rb asli record. Pajak hidup panjang Februari 2027. Service resmi lengkap. Tangan pertama dari baru. Body mulus, no minus. Interior bersih dan wangi. Mesin halus, kaki-kaki senyap. Ban tebal 95%. Surat-surat lengkap & siap balik nama. Ready stock, siap inspeksi. Harga Rp 650 juta nego tipis. Lokasi Gorontalo. Bisa cash / kredit / booking fee online. Hubungi: 0896-7733-2497.",
      features: [
        "KM 18rb asli record",
        "Pajak hidup panjang Februari 2027",
        "Service resmi lengkap",
        "Tangan pertama dari baru",
        "Body mulus, no minus",
        "Interior bersih dan wangi",
        "Mesin halus, kaki-kaki senyap",
        "Ban tebal 95%",
        "Surat-surat lengkap & siap balik nama",
        "Ready stock, siap inspeksi",
        "Cash / kredit / booking fee online",
      ],
      images: [
        "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=800&q=80",
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=800&q=80",
      ],
      paymentMethods: ["Cash", "Kredit", "Booking Fee Online"],
      isFeatured: true,
      isAvailable: true,
    },
  });

  console.log("Seed selesai. Admin: admin.nahda123@gmail.com / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
