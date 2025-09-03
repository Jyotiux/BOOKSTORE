import Cart from "../models/Cart.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";

// Helper to get user ID from request
const getUserId = (req) => (req.user?.id || req.user?._id)?.toString();

// Helper to populate cart and remove invalid book references
const populateCart = async (cart) => {
  if (!cart) return cart;

  await cart.populate({
    path: "items.bookId",
    select: "title author price coverImage",
  });

  // 🧹 Remove items where the book no longer exists (bookId is null)
  cart.items = cart.items.filter((item) => item.bookId !== null);

  return cart;
};

// GET /api/cart
export const getCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cart = await Cart.findOne({ userId });
    const populated = await populateCart(cart);

    res.json(populated || { items: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cart { bookId, quantity? }
export const addToCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { bookId, quantity } = req.body;
    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid bookId" });
    }

    const qty = Number(quantity) > 0 ? Math.floor(quantity) : 1;

    const book = await Book.findById(bookId).select("title price");
    if (!book) return res.status(404).json({ message: "Book not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const idx = cart.items.findIndex((item) => item.bookId.toString() === bookId);
    if (idx > -1) {
      cart.items[idx].quantity += qty;
    } else {
      cart.items.push({
        bookId,
        title: book.title,
        price: book.price,
        quantity: qty,
      });
    }

    await cart.save();
    const populated = await populateCart(cart);

    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/cart { bookId }
export const removeFromCart = async (req, res) => {
  try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { bookId } = req.body;
    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: "Invalid bookId" });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((item) => item.bookId.toString() !== bookId);

    await cart.save();
    const populated = await populateCart(cart);

    res.json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
