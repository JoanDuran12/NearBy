"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  console.log("ProtectedRoute - User:", !currentUser, "Loading:", loading);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !currentUser) {
      router.push("/login");
    }
  }, [currentUser, loading, router]);

  // Show loading spinner while checking auth state
  if (loading) {
    console.log("Still loading auth state...");
    return (
      <div className="flex justify-center items-center min-h-screen gap-4">
        <div className="animate-spin rounded-full size-12 border-b-2 border-gray-800"></div>
        <p>Authenticating....</p>
      </div>
    );
  }

  // Don't render anything if currentUser is not authenticated
  if (!currentUser) {
    console.log("No user, Going to login page...");
    return (
      <div className="flex justify-center items-center min-h-screen gap-4">
        <div className="animate-spin rounded-full size-12 border-b-2 border-gray-800"></div>
        <p>User not found error.....</p>
      </div>
    );
  }

  return children;
}
