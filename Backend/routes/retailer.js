import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const retailerId = req.id;

    // Fetch products of the retailer
    const products = await Product.find({ retailerId });
    const totalProducts = products.length;

    // Average ecoScore
    const avgSustainabilityScore =
      totalProducts === 0
        ? 0
        : products.reduce((sum, p) => sum + (p.sustainabilityScore || 0), 0) / totalProducts;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const thisMonthProducts = products.filter((p) => {
      const date = new Date(p.createdAt);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
   const thisMonthEmissions = thisMonthProducts.reduce(
  (total, product) => total + (product.carbonFootprint || 0),
  0
);


    // Green product percent
    const greenProducts = products.filter((p) => (p.sustainabilityScore || 0) >= 80);
    const greenProductPercent =
      totalProducts === 0
        ? 0
        : Math.round((greenProducts.length / totalProducts) * 100);

    // Emissions data for last 4 months dynamically
    const emissionsData = [];
    for (let i = 3; i >= 0; i--) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = targetDate.toLocaleString("default", { month: "short" });
      const year = targetDate.getFullYear();
      const monthIndex = targetDate.getMonth();

      const monthlyProducts = products.filter((p) => {
        const createdAt = new Date(p.createdAt);
        return (
          createdAt.getMonth() === monthIndex && createdAt.getFullYear() === year
        );
      });

      const totalEmissions = monthlyProducts.reduce(
  (sum, p) => sum + (p.carbonFootprint || 0),
  0
);

emissionsData.push({
  month,
  emissions: totalEmissions,
});

    }

    // Top 3 products by ecoScore
    const topProducts = products
      .sort((a, b) => (b.sustainabilityScore|| 0) - (a.sustainabilityScore || 0))
      .slice(0, 3)
      .map((p) => ({
        name: p.name || "Unnamed",
        score: p.sustainabilityScore|| 0,
      }));

    // Debugging
    console.log("📊 Emissions Data:", emissionsData);
    console.log("🏆 Top Products:", topProducts);

    // Response
    res.json({
      success: true,
      data: {
        totalProducts,
        avgSustainabilityScore: Math.round(avgSustainabilityScore),
        thisMonthEmissions,
        greenProductPercent,
        emissionsData,
        topProducts,
      },
    });
  } catch (err) {
    console.error("❌ Error in dashboard route:", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;