// routes/bookRoutes.js
import express from "express";
import { getBooks, addBook, updateBook, deleteBook } from "../controllers/bookController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", protect, isAdmin, addBook);
router.put("/:id", protect, isAdmin, updateBook);
router.delete("/:id", protect, isAdmin, deleteBook);

export default router;
