import React, { useState, useContext } from "react";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc"; // ✅ Google icon

const firestoreDb = getFirestore();

const SigninPage = () => {
  const { logininUserWithEmailAndPassword, signInWithGoogle } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const userCredential = await logininUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // get Firebase token
    const token = await user.getIdToken();
    console.log("Token after email/password signin:", token); // ✅ log token

    const userDoc = await getDoc(doc(firestoreDb, "users", user.uid));
    if (userDoc.exists()) {
      const { role } = userDoc.data();
      const userData = { id: user.uid, email: user.email, role };

      login(userData, token); // store real token in context/localStorage

      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/dashboard");
    }
  } catch (error) {
    console.error("Signin failed:", error);
    alert("Signin failed: " + error.message);
  }
};

const handleGoogleSignin = async () => {
  try {
    const user = await signInWithGoogle();

    // get Firebase token
    const token = await user.getIdToken();
    console.log("Token after Google signin:", token); // ✅ log token

    const userDoc = await getDoc(doc(firestoreDb, "users", user.uid));
    if (userDoc.exists()) {
      const { role } = userDoc.data();
      const userData = { id: user.uid, email: user.email, role };

      login(userData, token); // store real token

      if (role === "admin") navigate("/admin-dashboard");
      else navigate("/dashboard");
    }
  } catch (error) {
    console.error("Google signin failed:", error);
    alert("Google signin failed: " + error.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Welcome Back 
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="block mb-2 text-gray-700 font-semibold">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-semibold">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center">
          <div className="border-t border-gray-300 w-1/3" />
          <span className="mx-3 text-gray-500 font-medium text-sm">OR</span>
          <div className="border-t border-gray-300 w-1/3" />
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
        >
          <FcGoogle size={22} />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SigninPage;
