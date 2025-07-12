import express from "express";
import Product from "../models/Product.js";
import isAuthenticated from "../middleware/authMiddleware.js";
import mongoose from "mongoose"
const router = express.Router();
import { User } from "../models/User.js";


function calculateCarbonFootprint(category, transportDistanceKm, packagingType) {
  // Material base emissions in kg CO2 per kg
  const materialEmissions = {
    Plastic: 6,
    Cotton: 2,
    Aluminum: 10,
    Bamboo: 1.5,
    Paper: 1.8,
    Other: 5,
  };

  const packagingEmissions = {
    "Plastic-Free": 0.2,
    "Compostable": 0.5,
    "Biodegradable": 1,
    "Recyclable": 1.5,
    "Plastic": 2.5,
  };

  const materialCO2 = materialEmissions[category] || 5;
  const packagingCO2 = packagingEmissions[packagingType] || 2;
  const transportCO2 = 0.05 * transportDistanceKm; // 0.05 kg CO2 per km

  const totalCO2 = materialCO2 + packagingCO2 + transportCO2;
  return parseFloat(totalCO2.toFixed(2));
}


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


router.get("/my-products", isAuthenticated, async (req, res) => {
  try {
     console.log("req.id:", req.id);
    console.log("req.user:", req.user);
    
    const products = await Product.find({ retailerId: req.id })

    res.json({ success: true, 
       user: { role: req.user.role }, products });
  } catch (error) {
    console.error("Error in /my-products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Server error" });
  }
});


// Add a product
router.post("/add",isAuthenticated, async (req, res) => {
  const {
    name,
    category,
    imageUrl,
    recyclablePercent,
    supplierRating,
    
    packagingType,
    transportDistanceKm,
    
  } = req.body;

    const carbonFootprint = calculateCarbonFootprint(category, transportDistanceKm, packagingType);

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
     transportDistanceKm,
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






export default router;

