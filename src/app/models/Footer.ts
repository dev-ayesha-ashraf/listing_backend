// models/Footer.ts
import mongoose, { Schema } from 'mongoose';

const footerSchema = new Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    about: { type: String, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Footer || mongoose.model('Footer', footerSchema);
