// Add your TypeScript types here

export interface Yacht {
  id: number;
  name: string;
  location: string;
  image: string;
  price: number;
  guests: number;
  cabins: number;
  length: number;
  crew: number;
  category?: string;
  description: string;
  amenities: string[];
  images: string[];
}

export interface Wallet {
  id: string;
  address: string;
  balance: number;
  // Add more fields as needed
}
