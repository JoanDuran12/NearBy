"use client";

import ProtectedRoute from "../auth/ProtectedRoute";
import { useAuth } from "@/app/contexts/AuthContext";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <div>MAIN DASHHHHH</div>
    </ProtectedRoute>
  );
}
