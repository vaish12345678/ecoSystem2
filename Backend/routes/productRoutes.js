import express from "express";
import Product from "../models/Product.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import mongoose from "mongoose"
const router = express.Router();

// function calculateEcoScore(recyclablePercent, supplierRating, carbonFootprint) {
//   const score =
//     recyclablePercent * 0.4 +
//     supplierRating * 5 * 0.3 +
//     (100 - carbonFootprint) * 0.3;

//   return Math.min(Math.max(Math.round(score), 0), 100);
// }


function calculateEcoScore(recyclablePercent, supplierRating, carbonFootprint, packagingType) {
  let score =
    recyclablePercent * 0.4 +
    supplierRating * 5 * 0.3 + 
    (100 - carbonFootprint) * 0.3;

  const packagingBonus = {
    "Plastic-Free": 10,
    "Compostable": 8,
    "Biodegradable": 5,
    "Recyclable": 2,
  };

  score += packagingBonus[packagingType] || 0;

  return Math.min(Math.max(Math.round(score), 0), 100); // Clamp between 0-100
}


// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Add a product
router.post("/add",isAuthenticated, async (req, res) => {
  const {
    name,
    category,
    imageUrl,
    recyclablePercent,
    supplierRating,
    carbonFootprint,
    packagingType,
  } = req.body;

   const sustainabilityScore = calculateEcoScore(
    recyclablePercent,
    supplierRating,
    carbonFootprint,
    packagingType,
  );
  
  const product = new Product({
    name,
    category,
    imageUrl,
    recyclablePercent,
    supplierRating,
    carbonFootprint,
    sustainabilityScore,
    packagingType,
    retailerId: req.id,
  });

  // const product = new Product(req.body);
  await product.save();
  res.json({ success: true, product });
});

// Like a product
router.post("/:id/like", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  product.likes += 1;
  await product.save();
  res.json({ likes: product.likes });
});


// Add a comment
router.post("/:id/comment", async (req, res) => {
  const { text } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  product.comments.push(text);
  await product.save();
  res.json({ comments: product.comments });
});

// Delete a product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});



router.get("/my-products", isAuthenticated, async (req, res) => {
  try {
    const products = await Product.find({ retailerId: req.user._id }).sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    console.error("Error in /my-products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/me", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");
    res.json({ user });
  } catch (err) {
    console.error("Failed to get user:", err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



export default router;

