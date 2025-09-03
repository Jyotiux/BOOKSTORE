import React from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { FiHome, FiShoppingCart, FiLogOut } from "react-icons/fi"; // Optional icons

function Navbar() {
  const { logoutUser } = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/signin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-gray-900 bg-opacity-90 shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div
            className="text-white text-2xl font-bold cursor-pointer hover:text-blue-400 transition"
            onClick={() => navigate("/")}
          >
            BookStore
          </div>

          {/* Nav Buttons */}
          <div className="flex items-center space-x-4">
            {/* Home */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-1 text-white bg-gray-700 hover:bg-blue-600 transition px-4 py-2 rounded-full text-sm font-medium"
            >
              <FiHome />
              <span>Home</span>
            </button>

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="flex items-center space-x-1 text-white bg-gray-700 hover:bg-green-600 transition px-4 py-2 rounded-full text-sm font-medium"
            >
              <FiShoppingCart />
              <span>Cart</span>
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-white bg-gray-700 hover:bg-red-600 transition px-4 py-2 rounded-full text-sm font-medium"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
