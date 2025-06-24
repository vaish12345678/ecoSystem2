import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

// Add a product
router.post("/add", async (req, res) => {
  const product = new Product(req.body);
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

