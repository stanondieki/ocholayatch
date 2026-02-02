import { Yacht } from '@/types';

export const yachts: Yacht[] = [
  {
    id: 1,
    name: "Ocean Majesty",
    location: "Monaco",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
    price: 15000,
    guests: 12,
    cabins: 6,
    length: 150,
    crew: 8,
    category: 'Superyacht',
    description: "Experience unparalleled luxury aboard the Ocean Majesty. This magnificent superyacht combines cutting-edge technology with timeless elegance, featuring a helipad, infinity pool, and world-class amenities.",
    amenities: ["Helipad", "Infinity Pool", "Spa", "Gym", "Cinema", "Jacuzzi"],
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800",
    ]
  },
  {
    id: 2,
    name: "Azure Dream",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
    price: 12000,
    guests: 10,
    cabins: 5,
    length: 130,
    crew: 7,
    category: 'Luxury Yacht',
    description: "The Azure Dream offers an intimate luxury experience perfect for exploring tropical paradises. Crystal-clear waters await as you sail through the Maldives in ultimate comfort.",
    amenities: ["Diving Equipment", "Snorkeling Gear", "Jet Skis", "Spa", "Outdoor Dining"],
    images: [
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800",
    ]
  },
  {
    id: 3,
    name: "Royal Sapphire",
    location: "French Riviera",
    image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800",
    price: 18000,
    guests: 14,
    cabins: 7,
    length: 165,
    crew: 10,
    category: 'Megayacht',
    description: "The epitome of maritime luxury. Royal Sapphire features world-class amenities including a helipad, full spa, underwater observation lounge, and a Michelin-star chef on board.",
    amenities: ["Helipad", "Underwater Lounge", "Full Spa", "Tender Garage", "Beach Club"],
    images: [
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
    ]
  },
  {
    id: 4,
    name: "Serenity Elite",
    location: "Caribbean",
    image: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800",
    price: 13500,
    guests: 11,
    cabins: 5,
    length: 140,
    crew: 8,
    category: 'Luxury Yacht',
    description: "Discover tranquility and sophistication on the Serenity Elite. Perfect for Caribbean island hopping with family and friends in unmatched comfort.",
    amenities: ["Water Sports", "Sun Deck", "Jacuzzi", "BBQ Area", "Kayaks"],
    images: [
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800",
    ]
  },
  {
    id: 5,
    name: "Poseidon's Crown",
    location: "Greek Islands",
    image: "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800",
    price: 16500,
    guests: 12,
    cabins: 6,
    length: 155,
    crew: 9,
    category: 'Superyacht',
    description: "Named after the god of the sea, Poseidon's Crown offers a mythical voyage through the stunning Greek Islands with legendary service and amenities.",
    amenities: ["Pool", "Gym", "Wine Cellar", "Piano Lounge", "Tender"],
    images: [
      "https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
      "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800",
    ]
  },
  {
    id: 6,
    name: "Diamond Wave",
    location: "Dubai",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    price: 20000,
    guests: 16,
    cabins: 8,
    length: 180,
    crew: 12,
    category: 'Megayacht',
    description: "The pinnacle of luxury yachting in the Middle East. Diamond Wave features gold-accented interiors, a rooftop nightclub, and the most exclusive amenities on the sea.",
    amenities: ["Nightclub", "Gold Bar", "Spa Suite", "Helicopter", "Submarine"],
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800",
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800",
    ]
  },
];

export function getYachtById(id: number): Yacht | undefined {
  return yachts.find(y => y.id === id);
}
