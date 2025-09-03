import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current user's cart
router.get("/", protect, getCart);

// Add item to cart
router.post("/", protect, addToCart);

// Remove item from cart
router.delete("/", protect, removeFromCart);

export default router;
