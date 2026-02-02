import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Yacht from './models/Yacht.model';
import User from './models/User.model';

dotenv.config();

const yachtsData = [
  {
    name: 'Ocean Majesty',
    description: 'Experience unparalleled luxury aboard the Ocean Majesty, a stunning 180-foot superyacht featuring world-class amenities and breathtaking design.',
    shortDescription: 'A stunning 180-foot superyacht with world-class amenities',
    price: 75000,
    priceUnit: 'day',
    location: 'Monaco',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800',
    ],
    capacity: 12,
    cabins: 6,
    length: '180 ft',
    year: 2022,
    speed: '18 knots',
    amenities: ['Jacuzzi', 'Helipad', 'Gym', 'Cinema', 'Beach Club', 'Spa'],
    features: ['Full Crew', 'Chef', '24/7 Concierge', 'Water Sports Equipment'],
    rating: 5,
    reviews: 47,
    available: true,
    featured: true,
  },
  {
    name: 'Azure Dream',
    description: 'The Azure Dream offers an intimate and exclusive yachting experience with impeccable service and stunning Mediterranean views.',
    shortDescription: 'Intimate luxury yacht perfect for Mediterranean cruising',
    price: 45000,
    priceUnit: 'day',
    location: 'Maldives',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800',
    images: [
      'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800',
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
    ],
    capacity: 8,
    cabins: 4,
    length: '120 ft',
    year: 2021,
    speed: '15 knots',
    amenities: ['Jacuzzi', 'Swim Platform', 'BBQ Area', 'Sun Deck'],
    features: ['Captain', 'Chef', 'Stewardess', 'Snorkeling Gear'],
    rating: 4.9,
    reviews: 32,
    available: true,
    featured: true,
  },
  {
    name: 'Serenity Elite',
    description: 'Step aboard the Serenity Elite and discover a world of tranquility and sophistication on the open seas.',
    shortDescription: 'A masterpiece of naval architecture and design',
    price: 55000,
    priceUnit: 'day',
    location: 'Caribbean',
    category: 'Ultra Luxury',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800',
    images: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800',
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
    ],
    capacity: 10,
    cabins: 5,
    length: '150 ft',
    year: 2023,
    speed: '20 knots',
    amenities: ['Pool', 'Sauna', 'Gym', 'Cinema', 'Jet Ski'],
    features: ['Full Crew', 'Private Chef', 'Butler Service'],
    rating: 5,
    reviews: 28,
    available: true,
    featured: true,
  },
  {
    name: 'Royal Sapphire',
    description: 'The Royal Sapphire is a testament to timeless elegance and modern luxury, perfect for discerning guests.',
    shortDescription: 'Timeless elegance meets modern luxury',
    price: 65000,
    priceUnit: 'day',
    location: 'French Riviera',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800',
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800',
    ],
    capacity: 14,
    cabins: 7,
    length: '200 ft',
    year: 2020,
    speed: '16 knots',
    amenities: ['Helipad', 'Spa', 'Wine Cellar', 'Piano Lounge'],
    features: ['Full Crew', 'Sommelier', 'Masseuse'],
    rating: 4.8,
    reviews: 51,
    available: true,
    featured: true,
  },
  {
    name: 'Horizon Explorer',
    description: 'Built for adventure, the Horizon Explorer combines rugged capability with refined comfort for exploratory voyages.',
    shortDescription: 'Adventure-ready explorer yacht',
    price: 50000,
    priceUnit: 'day',
    location: 'Greek Islands',
    category: 'Explorer',
    image: 'https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800',
    images: [
      'https://images.unsplash.com/photo-1559599746-8823b38544c6?w=800',
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800',
    ],
    capacity: 12,
    cabins: 6,
    length: '165 ft',
    year: 2019,
    speed: '14 knots',
    amenities: ['Dive Center', 'Tender Garage', 'Observation Deck'],
    features: ['Expedition Crew', 'Dive Master', 'Marine Biologist'],
    rating: 4.9,
    reviews: 39,
    available: true,
    featured: true,
  },
  {
    name: 'Paradise Voyager',
    description: 'Escape to paradise aboard this exquisite yacht, designed for ultimate relaxation and unforgettable experiences.',
    shortDescription: 'Your floating paradise awaits',
    price: 40000,
    priceUnit: 'day',
    location: 'Dubai',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    capacity: 8,
    cabins: 4,
    length: '110 ft',
    year: 2022,
    speed: '17 knots',
    amenities: ['Jacuzzi', 'Flybridge', 'Water Toys'],
    features: ['Captain', 'Chef', 'Deckhands'],
    rating: 4.7,
    reviews: 23,
    available: true,
    featured: false,
  },
  {
    name: 'Crystal Waters',
    description: 'Sail through crystal waters aboard this magnificent yacht, where every detail speaks of luxury.',
    shortDescription: 'Magnificent yacht for crystal clear adventures',
    price: 35000,
    priceUnit: 'day',
    location: 'Bahamas',
    category: 'Premium',
    image: 'https://images.unsplash.com/photo-1535916707207-35f97e715e1c?w=800',
    images: [
      'https://images.unsplash.com/photo-1535916707207-35f97e715e1c?w=800',
    ],
    capacity: 6,
    cabins: 3,
    length: '85 ft',
    year: 2021,
    speed: '22 knots',
    amenities: ['Sun Deck', 'BBQ', 'Snorkeling Gear'],
    features: ['Captain', 'Chef'],
    rating: 4.8,
    reviews: 18,
    available: true,
    featured: false,
  },
  {
    name: 'Mediterranean Star',
    description: 'Experience the best of the Mediterranean aboard this stunning motor yacht with exceptional service.',
    shortDescription: 'Star of the Mediterranean seas',
    price: 48000,
    priceUnit: 'day',
    location: 'Amalfi Coast',
    category: 'Luxury',
    image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800',
    images: [
      'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800',
    ],
    capacity: 10,
    cabins: 5,
    length: '140 ft',
    year: 2020,
    speed: '18 knots',
    amenities: ['Spa', 'Gym', 'Cinema', 'Wine Cellar'],
    features: ['Full Crew', 'Michelin Chef'],
    rating: 4.9,
    reviews: 42,
    available: true,
    featured: false,
  },
  {
    name: 'Caribbean Queen',
    description: 'Reign over the Caribbean seas aboard this majestic yacht, where luxury knows no bounds and every sunset is a royal affair.',
    shortDescription: 'Majestic yacht for Caribbean adventures',
    price: 58000,
    priceUnit: 'day',
    location: 'St. Barts',
    category: 'Ultra Luxury',
    image: 'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=800',
    images: [
      'https://images.unsplash.com/photo-1599256872237-5dcc0fbe9668?w=800',
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800',
    ],
    capacity: 10,
    cabins: 5,
    length: '155 ft',
    year: 2023,
    speed: '19 knots',
    amenities: ['Infinity Pool', 'Beach Club', 'Jet Skis', 'Underwater Lounge', 'Spa'],
    features: ['Full Crew', 'Personal Chef', 'Concierge', 'Water Sports Instructor'],
    rating: 5,
    reviews: 35,
    available: true,
    featured: true,
  },
];

const adminUser = {
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@ocholayachts.com',
  password: 'Admin@123',
  role: 'admin',
  isVerified: true,
};

const seedDatabase = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ocholayachts';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Yacht.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert yachts
    await Yacht.insertMany(yachtsData);
    console.log(`✅ Inserted ${yachtsData.length} yachts`);

    // Create admin user
    const admin = new User(adminUser);
    await admin.save();
    console.log('✅ Created admin user (admin@ocholayachts.com / Admin@123)');

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
