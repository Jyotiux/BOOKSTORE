// backend/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
// import bookRoutes2 from "./routes/books.js";
import cartRoutes from "./routes/cart.js";
import bookRoutes from "./routes/bookRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orders.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',  // 🔥 must match your frontend exactly
  credentials: true                 // 🔥 this allows cookies or Authorization headers
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/cart", cartRoutes);
// app.use("/books", bookRoutes2);
app.use("/api/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error(err));
