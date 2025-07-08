import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
