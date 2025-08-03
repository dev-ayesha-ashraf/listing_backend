import { models, Schema, model } from 'mongoose';
import '../models/Category';
import '../models/Seller';
// import '../models/Location';
// import '../models/PropertyType';

const listingSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    price: { type: Number, required: true },
    listingId: { type: String, required: true, unique: true },

    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },

    // ✅ New field: sellerId
    sellerId: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },

    // locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
    // propertyTypeId: { type: Schema.Types.ObjectId, ref: 'PropertyType', required: true },

    listingType: {
      type: String,
      enum: ['sale', 'rent', 'lease', 'auction'],
      required: false,
    },


    // status: {
    //   type: String,
    //   enum: ['available', 'sold', 'pending', 'off-market'],
    //   default: 'available',
    // },

    badge: { type: String },
    purpose: { type: String },
  },
  { timestamps: true }
);

export default models.Listing || model('Listing', listingSchema);
