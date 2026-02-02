import mongoose, { Document, Schema } from 'mongoose';

export interface IYacht extends Document {
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  priceUnit: 'day' | 'week';
  location: string;
  category: string;
  image: string;
  images: string[];
  capacity: number;
  cabins: number;
  length: string;
  year: number;
  speed: string;
  amenities: string[];
  features: string[];
  rating: number;
  reviews: number;
  available: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const YachtSchema = new Schema<IYacht>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    price: { type: Number, required: true },
    priceUnit: { type: String, enum: ['day', 'week'], default: 'day' },
    location: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    capacity: { type: Number, required: true },
    cabins: { type: Number, required: true },
    length: { type: String, required: true },
    year: { type: Number, required: true },
    speed: { type: String },
    amenities: [{ type: String }],
    features: [{ type: String }],
    rating: { type: Number, default: 5, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create text index for search
YachtSchema.index({ name: 'text', description: 'text', location: 'text', category: 'text' });

export default mongoose.model<IYacht>('Yacht', YachtSchema);
