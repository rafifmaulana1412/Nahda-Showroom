export type Car = {
  id: string;
  name: string;
  price: number;
  mileage: number;
  location?: string;
  contactPerson?: string;
  isAvailable: boolean;

  // 🔥 TAMBAHAN INI
  images?: string[];
};

export interface FilterParams {
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
