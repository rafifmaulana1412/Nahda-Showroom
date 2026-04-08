import Link from "next/link";
import { Car } from "@/lib/types";
import { formatPrice, formatMileage } from "@/lib/data";

export default function CarCard({ car }: { car: Car }) {
  return (
    <Link
      href={`/katalog/${car.id}`}
      className="card block group hover:-translate-y-1 transition"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={car.images?.[0] || "/no-image.png"}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />

        <div className="absolute top-3 left-3">
          <span className={car.isAvailable ? "badge-baru" : "badge-bekas"}>
            {car.isAvailable ? "Ready" : "Tidak Ready"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {car.name}
        </h3>
        <p className="text-primary font-bold text-lg mb-3">
          {formatPrice(car.price)}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            {formatMileage(car.mileage)}
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {car.location || "-"}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {car.contactPerson || "-"}
          </span>
          <span className="text-xs text-primary font-medium">
            Lihat Detail →
          </span>
        </div>
      </div>
    </Link>
  );
}
