"use client";

import ProtectedRoute from "../auth/ProtectedRoute";
import { useAuth } from "@/app/contexts/AuthContext";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div>
      THIS IS DASHBOARDDDDDDDD
    </div>
  );
}
