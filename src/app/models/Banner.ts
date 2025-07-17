// models/Banner.ts
import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBanner extends Document {
  name: string;
  slug: string;
  categoryId: mongoose.Types.ObjectId;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

const Banner = models.Banner || mongoose.model<IBanner>('Banner', bannerSchema);
export default Banner;
