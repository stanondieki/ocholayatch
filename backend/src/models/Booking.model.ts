import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  bookingId: string;
  user: mongoose.Types.ObjectId;
  yacht: mongoose.Types.ObjectId;
  yachtName: string;
  yachtImage: string;
  startDate: Date;
  endDate: Date;
  guests: number;
  days: number;
  pricePerDay: number;
  serviceFee: number;
  totalPrice: number;
  paymentMethod: 'card' | 'crypto';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  stripePaymentIntentId?: string;
  cryptoDetails?: {
    currency: string;
    address: string;
    transactionHash?: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    yacht: { type: Schema.Types.ObjectId, ref: 'Yacht', required: true },
    yachtName: { type: String, required: true },
    yachtImage: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    guests: { type: Number, required: true },
    days: { type: Number, required: true },
    pricePerDay: { type: Number, required: true },
    serviceFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['card', 'crypto'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
    stripePaymentIntentId: { type: String },
    cryptoDetails: {
      currency: { type: String },
      address: { type: String },
      transactionHash: { type: String },
    },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    specialRequests: { type: String },
    guestInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
  },
  { timestamps: true }
);

// Index for querying bookings
BookingSchema.index({ user: 1, createdAt: -1 });
BookingSchema.index({ yacht: 1, startDate: 1, endDate: 1 });

export default mongoose.model<IBooking>('Booking', BookingSchema);
