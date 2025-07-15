// server.js or index.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/db.js";

// Route imports
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import advisorRoutes from "./routes/advisor.js";
import dashboardRoutes from "./routes/retailer.js";
import aiRoutes from "./routes/ai.js";

// App config
const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS setup before any routes
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

// Routes
app.use("/api/ai", aiRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/advisor", advisorRoutes);
app.use("/api/retailer", dashboardRoutes);

app.get("/home", (req, res) => {
  res.send("i am coming from backend");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
