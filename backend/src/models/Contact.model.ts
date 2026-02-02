import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  interest?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    interest: { type: String },
    status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  },
  { timestamps: true }
);

export default mongoose.model<IContact>('Contact', ContactSchema);
