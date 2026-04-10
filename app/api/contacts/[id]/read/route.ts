import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await prisma.contact.update({
    where: { id },
    data: { isRead: true },
  });
  return NextResponse.json({ ok: true });
}
