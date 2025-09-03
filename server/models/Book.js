// backend/models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String },
    price: { type: Number, required: true },
    coverImage: { type: String }, // URL for cover image
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
