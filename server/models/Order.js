import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, ref: "User", required: true },
    items: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        title: String,
        price: Number,
        quantity: Number,
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "confirmed", "shipped", "delivered"], default: "pending" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
