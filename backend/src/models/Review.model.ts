import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  yacht: mongoose.Types.ObjectId;
  booking?: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  text: string;
  destination: string;
  images?: string[];
  isApproved: boolean;
  isVerifiedBooking: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    yacht: { type: Schema.Types.ObjectId, ref: 'Yacht', required: true },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    text: { type: String, required: true },
    destination: { type: String, required: true },
    images: [{ type: String }],
    isApproved: { type: Boolean, default: false },
    isVerifiedBooking: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Prevent duplicate reviews per booking
ReviewSchema.index({ user: 1, yacht: 1, booking: 1 }, { unique: true });

export default mongoose.model<IReview>('Review', ReviewSchema);
