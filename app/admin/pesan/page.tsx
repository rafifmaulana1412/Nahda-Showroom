import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import MarkReadButton from "@/components/MarkReadButton";

export default async function PesanPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    include: { car: { select: { name: true } } },
  });

  const unread = contacts.filter((c) => !c.isRead).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pesan Masuk</h1>
          <p className="text-gray-500 text-sm">
            {unread > 0 ? (
              <span className="text-orange-500 font-medium">
                {unread} pesan belum dibaca
              </span>
            ) : (
              "Semua pesan sudah dibaca"
            )}
          </p>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500">Belum ada pesan masuk</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 transition-all ${
                contact.isRead ? "border-gray-200" : "border-primary"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-semibold text-gray-900">
                      {contact.nama}
                    </p>
                    {!contact.isRead && (
                      <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                        Baru
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(contact.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Telepon</p>
                      <p className="text-gray-700 font-medium">
                        {contact.telepon}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      <p className="text-gray-700">{contact.email || "-"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Keperluan</p>
                      <p className="text-gray-700 capitalize">
                        {contact.keperluan.replace("-", " ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Mobil</p>
                      <p className="text-gray-700">
                        {contact.car?.name || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
                    {contact.pesan}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                <a
                  href={`https://wa.me/${contact.telepon.replace(/\D/g, "")}?text=Halo%20${encodeURIComponent(contact.nama)}%2C%20terima%20kasih%20sudah%20menghubungi%20Nahda%20Showroom.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Balas via WA
                </a>

                {!contact.isRead && <MarkReadButton contactId={contact.id} />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
