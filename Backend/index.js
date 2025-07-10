import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDb from "./utils/db.js";

// Route imports
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js"; // ✅ NEW
import advisorRoutes from "./routes/advisor.js";


// App config
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
const corsOption = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOption));

// Routes
app.get("/home", (req, res) => {
  res.send("i am coming from backend");
});

app.use("/api/v1/user", userRoutes);
app.use("/api/products", productRoutes); // ✅ Mount product & upload routes
app.use("/api/advisor", advisorRoutes);

// Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
