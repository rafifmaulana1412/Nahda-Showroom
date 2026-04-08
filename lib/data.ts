export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(mileage: number) {
  return new Intl.NumberFormat("id-ID").format(mileage) + " km";
}
