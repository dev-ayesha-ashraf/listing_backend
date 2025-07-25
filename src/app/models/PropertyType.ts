// models/PropertyType.ts

import mongoose, { Schema } from "mongoose";

const propertyTypeSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PropertyType || mongoose.model("PropertyType", propertyTypeSchema);
