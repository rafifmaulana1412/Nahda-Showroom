export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: string;
  transmission: string;
  fuel: string;
  mileage: number;
  color: string;
  images: string[];
  description: string;
  features: string[];
  location: string | null;
  paymentMethods: string[];
  contactPerson: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  createdAt: Date;
}

export interface Contact {
  id: string;
  carId: string | null;
  nama: string;
  telepon: string;
  email: string | null;
  keperluan: string;
  pesan: string;
  isRead: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface FilterParams {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
}
