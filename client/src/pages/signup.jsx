import React, { useState, useContext } from "react";
import { useFirebase } from "../context/firebase";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc"; // Optional Google icon

const SignupPage = () => {
  const { signupUserWithEmailAndPassword, signInWithGoogle } = useFirebase();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("user");

  const createUser = () => {
    signupUserWithEmailAndPassword(email, password, role)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = { id: user.uid, email: user.email, role };
        login(userData, "dummy-firebase-token");
        alert("Signup successful!");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        alert("Signup failed: " + error.message);
      });
  };

  const handleGoogleSignup = () => {
    signInWithGoogle()
      .then((user) => {
        console.log("Google sign-in user:", user);
        alert("Google signup successful!");
      })
      .catch((error) => {
        console.error("Google signup failed:", error);
        alert("Google signup failed: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create an Account</h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={createUser}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-md"
        >
          Sign Up
        </button>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="mx-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 py-3 rounded-md hover:shadow-lg transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
