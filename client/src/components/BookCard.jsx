import React from "react";
import { useCart } from "../context/CartContext";

function BookCard({ book }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="overflow-hidden rounded-t-lg">
        <img
          src={book.coverImage || "https://via.placeholder.com/300x180?text=No+Image"}
          alt={book.title}
          className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x180?text=No+Image";
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{book.title}</h2>
        <p className="text-gray-600 mb-3">By {book.author}</p>
        <p className="text-blue-600 font-bold mb-4">₹{book.price?.toFixed(2)}</p>

        <button
          onClick={() => addToCart(book)}
          className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default BookCard;
