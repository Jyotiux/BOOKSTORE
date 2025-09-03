import express from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder); // Checkout
router.get("/", protect, getOrders);    // Get user/admin orders
router.put("/status", protect, isAdmin, updateOrderStatus); // Admin updates status

export default router;
