import mongoose, { Schema, models } from 'mongoose';

const bannerSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

const Banner = models.Banner || mongoose.model('Banner', bannerSchema);
export default Banner;
