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
  comments: { type: [String], default: [] },
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
