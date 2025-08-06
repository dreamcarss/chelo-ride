import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabase";

const AuthPage = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user) {
        navigate("/profile"); // Redirect if already logged in
      }
    };

    checkUser();
  }, [navigate]);

  // Handle Phone Number Login/Signup
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
        options: {
          data: isSignUpMode
            ? {
                first_name: name,
                phone_number: phoneNumber,
              }
            : undefined,
        },
      });

      if (error) throw error;

      setOtpSent(true);
      setError("");
    } catch (err) {
      setError(err?.message || "Failed to send OTP. Please check your phone number.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      const id = localStorage.getItem('carId');
      navigate(id ? `/vehicles/${id}` : "/");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (error) throw error;
    } catch (err) {
      setError(err.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
    setOtpSent(false);
    setOtp("");
    setError("");
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber,
      });

      if (error) throw error;

      setError("");
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 pt-20">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg border border-gray-700 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2 text-center">
          {otpSent 
            ? "Verify Your Phone" 
            : isSignUpMode 
              ? "Create Account" 
              : "Welcome Back"
          }
        </h1>
        <p className="text-gray-400 text-center mb-6">
          {otpSent 
            ? `We sent a code to ${phoneNumber}` 
            : isSignUpMode 
              ? "Join us today" 
              : "Sign in to continue"
          }
        </p>

        {error && (
          <div className="text-red-400 bg-red-900/20 border border-red-800 p-3 rounded mb-6 text-sm">
            {error}
          </div>
        )}

        {/* {!otpSent ? (
          <form onSubmit={handleSendOTP} className="space-y-5 mb-5">
            {isSignUpMode && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
                />
              </div>
            )}

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 123 456 7890"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Include country code (e.g., +91 for India)
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center mt-6"
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-black rounded-full"></span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-5 mb-5">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-300 mb-1">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                disabled={isVerifying}
                maxLength={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 text-center text-2xl tracking-widest"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || otp.length !== 6}
              className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center mt-6"
            >
              {isVerifying ? (
                <span className="animate-spin h-5 w-5 border-t-2 border-b-2 border-black rounded-full"></span>
              ) : (
                "Verify & Continue"
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-yellow-400 hover:text-yellow-300 font-medium transition duration-200 text-sm"
              >
                Didn't receive the code? Resend OTP
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setError("");
                }}
                className="text-gray-400 hover:text-gray-300 font-medium transition duration-200 text-sm"
              >
                ← Change phone number
              </button>
            </div>
          </form>
        )} */}

        {!otpSent && (
          <>
            {/* <div className="my-4 flex items-center">
              <hr className="flex-grow border-gray-700" />
              <span className="px-2 text-gray-500 text-sm">or</span>
              <hr className="flex-grow border-gray-700" />
            </div> */}

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-100 font-semibold py-3 px-4 rounded-md shadow transition duration-300 mb-4"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google logo"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            {/* Toggle Mode Button */}
            <div className="text-center">
              <button
                onClick={toggleMode}
                className="text-yellow-400 hover:text-yellow-300 font-medium transition duration-200"
              >
                {isSignUpMode
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;