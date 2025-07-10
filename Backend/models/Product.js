import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  imageUrl: String,
  recyclablePercent: Number,
  supplierRating: Number,
  carbonFootprint: Number,
  sustainabilityScore: Number,
  likes: { type: Number, default: 0 },
  
  packagingType: {
    type: String,
    enum: ['Plastic-Free', 'Compostable', 'Biodegradable', 'Recyclable'],
    required: true,
  },

  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // assuming your user model is called "User"
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
