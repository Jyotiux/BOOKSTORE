import React from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  // Total calculation
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.bookId.price * item.quantity,
    0
  );

  // Checkout handler
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to checkout.");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {}, // cart is stored in backend, no need to send from frontend
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("Order placed:", res.data);
      alert("Order placed successfully!");
      clearCart(); // Clear frontend cart
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to place order. Try again.");
    }
  };

  // Empty cart UI
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-gray-600">
        <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
        <p className="text-lg">Your cart is empty.</p>
      </div>
    );
  }

  // Render cart
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.bookId._id}
            className="flex justify-between items-center border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold text-lg">{item.bookId.title}</p>
              <p className="text-gray-600 text-sm">
                Quantity: <span className="font-medium">{item.quantity}</span>
              </p>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-lg font-semibold">
                ₹{item.bookId.price * item.quantity}
              </p>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                onClick={() => removeFromCart(item.bookId._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center border-t pt-4 border-gray-300">
        <p className="text-xl font-semibold">Total: ₹{totalAmount}</p>
        <div className="flex gap-2">
          <button
            className="bg-gray-800 text-white px-5 py-2 rounded-md hover:bg-gray-900 transition"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button
            className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
