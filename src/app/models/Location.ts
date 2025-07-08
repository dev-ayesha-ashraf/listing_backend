import mongoose, { Schema } from 'mongoose';

const locationSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Location || mongoose.model('Location', locationSchema);
