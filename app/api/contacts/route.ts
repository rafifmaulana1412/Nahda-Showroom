import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// GET (protected admin)
export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization");
  if (token !== "Bearer admin-token-123") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(contacts);
  } catch {
    return NextResponse.json(
      { error: "Gagal mengambil data kontak" },
      { status: 500 },
    );
  }
}

// POST (public) - kirim pesan + notif email ke admin
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const contact = await prisma.contact.create({
      data: {
        nama: body.nama,
        telepon: body.telepon,
        email: body.email,
        keperluan: body.keperluan,
        pesan: body.pesan,
        carId: body.carId || null,
      },
    });

    // Kirim notifikasi email ke admin
    if (
      process.env.RESEND_API_KEY &&
      process.env.RESEND_API_KEY !== "re_your_resend_api_key"
    ) {
      await resend.emails.send({
        from: "Nahda Showroom <onboarding@resend.dev>",
        to: process.env.ADMIN_NOTIFY_EMAIL!,
        subject: `Pesan baru dari ${body.nama} - ${body.keperluan}`,
        html: `
          <h2>Pesan Baru Masuk</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Nama</strong></td><td style="padding:8px;border:1px solid #ddd">${body.nama}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Telepon</strong></td><td style="padding:8px;border:1px solid #ddd">${body.telepon}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Email</strong></td><td style="padding:8px;border:1px solid #ddd">${body.email || "-"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Keperluan</strong></td><td style="padding:8px;border:1px solid #ddd">${body.keperluan}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd"><strong>Pesan</strong></td><td style="padding:8px;border:1px solid #ddd">${body.pesan}</td></tr>
          </table>
          <p style="margin-top:16px"><a href="https://nahda-showroom.vercel.app/admin">Lihat di Dashboard</a></p>
        `,
      });
    }

    return NextResponse.json(contact, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan data kontak" },
      { status: 500 },
    );
  }
}
