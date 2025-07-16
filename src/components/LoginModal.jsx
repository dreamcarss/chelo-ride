import { useState } from "react";
import supabase from "../lib/supabase";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Login error:", error.message);
      } else {
        onClose(); // Close the modal after successful login
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user sign-up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            phone_number: phoneNumber,
          },
        },
      });
      if (error) {
        console.error("Sign-up error:", error.message);
      } else {
        handleLogin(e); // Auto-login after sign-up
      }
    } catch (err) {
      console.error("Unexpected error during sign-up:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative bg-black p-8 rounded-lg shadow-lg w-96 border border-gray-700">
        {/* Modal Content */}
        <h2 className="text-3xl font-bold text-yellow-500 mb-6">
          {isSignUpMode ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={isSignUpMode ? handleSignUp : handleLogin} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:border-yellow-500 transition duration-300"
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
          </div>

          {/* Phone Number Field (Only for Sign-Up Mode) */}
          {isSignUpMode && (
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:border-yellow-500 transition duration-300"
                placeholder="Enter your phone number"
                required
                disabled={isLoading}
              />
            </div>
          )}

          {/* Password Field */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-600 bg-black text-white rounded-md focus:outline-none focus:border-yellow-500 transition duration-300"
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
              ) : (
                (isSignUpMode ? "Sign Up" : "Login")
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsSignUpMode(!isSignUpMode)}
            className="text-yellow-500 rounded-md hover:bg-gray-700 transition duration-300 justify-center w-full"
            disabled={isLoading}
          >
            {isSignUpMode ? "Back to Login" : "Create Account"}
          </button>
        </form>

        {/* Fullscreen Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;