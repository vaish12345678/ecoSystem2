import express from "express";
const router = express.Router();

router.post("/analyze", (req, res) => {
  const { packagingType, carbonFootprint } = req.body;

  let suggestions = [];

  if (packagingType === "Plastic") {
    suggestions.push("Avoid plastic packaging. Try biodegradable or compostable materials.");
  } else if (packagingType === "Recyclable") {
    suggestions.push("Consider switching to compostable packaging to improve sustainability.");
  }

  if (carbonFootprint > 70) {
    suggestions.push("High carbon footprint detected. Use local suppliers or low-emission delivery methods.");
  } else {
    suggestions.push("Your carbon emissions are within a moderate range. You can further reduce by optimizing logistics.");
  }

  res.json({ suggestions });
});

export default router;
