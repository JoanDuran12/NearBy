// hooks/useAuthRedirect.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export function useAuthRedirect(
  redirectTo = "/login",
  redirectWhenAuthenticated = false
) {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Wait for auth to load

    if (redirectWhenAuthenticated && currentUser) {
      // Redirect authenticated users away from login/signup pages
      router.push("/dashboard");
    } else if (!redirectWhenAuthenticated && !currentUser) {
      // Redirect unauthenticated users to login
      router.push(redirectTo);
    }
  }, [currentUser, loading, router, redirectTo, redirectWhenAuthenticated]);

  return { currentUser, loading };
}

// Usage examples:
// For protected pages: useAuthRedirect('/login');
// For login/signup pages: useAuthRedirect('/dashboard', true);
