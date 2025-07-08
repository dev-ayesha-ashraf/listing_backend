import mongoose, { Schema } from 'mongoose';

const sellerSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Seller || mongoose.model('Seller', sellerSchema);
