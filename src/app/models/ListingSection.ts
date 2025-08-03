import mongoose, { Schema, Document, models } from "mongoose";

export interface IListingSection extends Document {
  title: string;
  category: string;
  cardLimit: number;
  createdAt: Date;
}

const listingSectionSchema = new Schema<IListingSection>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, 
    cardLimit: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ListingSection =
  models.ListingSection || mongoose.model<IListingSection>("ListingSection", listingSectionSchema);

export default ListingSection;
