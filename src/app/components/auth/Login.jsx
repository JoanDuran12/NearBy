"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { login, loginWithGoogle, resetPassword } = useAuth();
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(""); // Clear error when user starts typing
  };

  // Check if its the first time the user is loggging into the account
  const checkUserProfile = async (uid) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${uid}`);
      return response.ok;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);

      const result = await login(email, password);
      setMessage("Logged in successfully!");

      // Check if user profile exists
      const hasProfile = await checkUserProfile(result.user.uid);

      // Redirect to home if user has a profile in DB, if not redirect to onboarding
      if (hasProfile) {
        router.push("/home");
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(getErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const result = await loginWithGoogle();
      setMessage("Logged in with Google successfully!");

      // Check if user profile exists
      const hasProfile = await checkUserProfile(result.user.uid);

      // Redirect to home if user has a profile in DB, if not redirect to onboarding
      if (hasProfile) {
        router.push("/home");
      } else {
        router.push("/onboarding");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);

      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        setError("PopUp was closed. Please try again.");
        return;
      } else {
        setError("An error occurred during Google sign-in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // const handleForgotPassword = async () => {
  //   if (!email) {
  //     setError("Please enter your email address first");
  //     return;
  //   }

  //   try {
  //     setError("");
  //     setMessage("");
  //     setLoading(true);

  //     await resetPassword(email);
  //     setMessage("Password reset email sent! Check your inbox.");
  //   } catch (error) {
  //     const firebaseError = error;
  //     setError(getErrorMessage(firebaseError.code));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/invalid-credential":
        return "Invalid credentials, please try again";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later";
      default:
        return "An error occurred. Please try again";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="flex flex-col sm:w-[400px]">
          <div className="flex flex-col items-center pb-8">
            <h1 className="text-4xl font-semibold">Welcome Back</h1>
            <span className="text-sm text-gray-400">
              Please enter your details to Log In
            </span>
          </div>

          {/* Error Message PopUp */}
          {error && (
            <div className="flex items-center justify-center mb-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message PopUp */}
          {message && (
            <div className="flex items-center justify-center mb-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {message}
            </div>
          )}

          <form
            className="flex flex-col gap-6 mb-8 text-base"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                className="border rounded-lg shadow-sm shadow-gray-300 px-4 py-1 outline-0"
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleEmailChange}
                value={email}
                required
                disabled={loading}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <input
                className="border rounded-lg shadow-sm shadow-gray-300 px-4 py-1 outline-0"
                type="password"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={handlePasswordChange}
                value={password}
                required
                disabled={loading}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                // onClick={handleForgotPassword}
                className="text-blue-600 hover:underline font-medium"
                disabled={loading}
              >
                Forgot Password?
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <button
                className="border rounded-lg py-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <div className="flex items-center my-2">
                <hr className="flex-grow border-gray-400" />
                <span className="mx-2 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-gray-400" />
              </div>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="border rounded-lg py-1 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={loading}
              >
                {/* Google SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? "Logging In..." : "Log In With Google"}
              </button>
            </div>
          </form>
          <div className="text-sm flex justify-center items-center gap-2">
            <span>Don't have an account?</span>
            <a className="hover:underline font-medium" href="/signup">
              Sign Up for Free
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
