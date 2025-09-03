import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Get token from context
  const [cart, setCart] = useState([]);

  // Memoize authHeaders so it only changes when token changes
  const authHeaders = useMemo(() => {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }, [token]);

  console.log(AuthContext);
  console.log(useContext(AuthContext));
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: authHeaders,
        });
        setCart(res.data.items || []);
      } catch (err) {
        console.error("Failed to fetch cart:", err);
      }
    };

    if (token) fetchCart();
  }, [token, authHeaders]);

  const addToCart = async (book, quantity = 1) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart",
        { bookId: book._id, quantity },
        { headers: authHeaders }
      );
      setCart(res.data.items || []);
    } catch (err) {
  if (err.response) {
    // Server responded with a status outside 2xx
    console.error("Failed to add to cart:", err.response.status, err.response.data);
  } else if (err.request) {
    // Request was made but no response received
    console.error("No response received:", err.request);
  } else {
    // Something else happened setting up the request
    console.error("Error", err.message);
  }
}

  };

  const removeFromCart = async (bookId) => {
    try {
      const res = await axios.delete("http://localhost:5000/api/cart", {
        data: { bookId },
        headers: authHeaders,
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Failed to remove from cart:", err);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
