"use client";

import ProtectedRoute from "../auth/ProtectedRoute";
import { useAuth } from "@/app/contexts/AuthContext";
import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="flex flex-col bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back,{" "}
              {currentUser?.displayName ||
                currentUser?.email?.split("@")[0] ||
                "User"}
              {console.log("Current User:", currentUser)}
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your events and activities..
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Events Attended
              </h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                Upcoming Events
              </h3>
              <p className="text-3xl font-bold text-green-600">3</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">
                Events Created
              </h3>
              <p className="text-3xl font-bold text-purple-600">2</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">
                    Registered for "Tech Meetup 2024"
                  </p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">
                    Created event "Community Cleanup"
                  </p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-800">
                    Attended "Local Food Festival"
                  </p>
                  <p className="text-sm text-gray-600">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
