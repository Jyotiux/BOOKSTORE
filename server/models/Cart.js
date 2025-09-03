// backend/models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
      title: String,
      price: Number,
      quantity: { type: Number, default: 1 },
    },
  ],
});


export default mongoose.model("Cart", CartSchema);
