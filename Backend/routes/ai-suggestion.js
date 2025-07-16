// import express from "express";
// import Product from "../models/Product.js";
// import { User } from "../models/User.js";
// import isAuthenticated from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Mock AI logic based on categories or history (extend later with GPT API)
// router.get("/:userId", isAuthenticated, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Fetch user's liked/viewed products (extend this logic with real tracking)
//     const likedProducts = await Product.find({ likes: { $gt: 0 } }).limit(5);

//     const categoryInterestMap = {};

//     likedProducts.forEach((product) => {
//       categoryInterestMap[product.category] = (categoryInterestMap[product.category] || 0) + 1;
//     });

//     const suggestions = [];

//     for (const category in categoryInterestMap) {
//       switch (category) {
//         case "Plastic":
//           suggestions.push("Try switching to bamboo or reusable steel alternatives.");
//           break;
//         case "Cotton":
//           suggestions.push("Prefer organic cotton to reduce pesticide use.");
//           break;
//         case "Aluminum":
//           suggestions.push("Consider reusable bottles instead of cans.");
//           break;
//         case "Other":
//           suggestions.push("Explore compostable material-based products.");
//           break;
//         default:
//           suggestions.push("Choose products with high recyclable content.");
//       }
//     }

//     // If no likes found, show general tips
//     if (suggestions.length === 0) {
//       suggestions.push("Start using cloth bags instead of plastic.");
//       suggestions.push("Look for compostable packaging options.");
//       suggestions.push("Reduce transportation distance to lower CO2 impact.");
//     }

//     res.json({ success: true, suggestions });
//   } catch (error) {
//     console.error("Error generating AI suggestions:", error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });

// export default router;
