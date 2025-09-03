import jwt from "jsonwebtoken";
import User from "../models/User.js";

import admin from "../firebaseAdmin.js"; // new file

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token received in backend:", token); // ✅ check token on backend
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Decoded token:", decodedToken); // ✅ see decoded info
    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || "user",
    };
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Token verification failed" });
  }
};



// Check if user is admin
// Rename this so it doesn't conflict with firebase-admin
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin only access" });
  }
};