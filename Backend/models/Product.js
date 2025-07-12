import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  
  // category: String,
    category: {
    type: String,
    required: true,
    enum: ['Cotton', 'Plastic', 'Aluminum', 'Bamboo', 'Paper', 'Other'],
  },
  imageUrl: String,
  recyclablePercent: Number,
  supplierRating: Number,
  carbonFootprint: Number,
  sustainabilityScore: Number,
  likes: { type: Number, default: 0 },
  transportDistanceKm: { type: Number, required: true },
  packagingType: {
    type: String,
    enum: ['Plastic-Free', 'Compostable', 'Biodegradable', 'Recyclable'],
    required: true,
  },
  
  
  
  comments: { type: [String], default: [] },
      retailerId: {
     
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // assuming your user model is called "User"
      required: true,
    },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
