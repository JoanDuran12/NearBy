"use client";

import ProtectedRoute from "../auth/ProtectedRoute";
import { useAuth } from "@/app/contexts/AuthContext";
import { IconCalendar } from "@tabler/icons-react";
// import { useAuthRedirect } from "@/app/hooks/useAuthRedirect";

export default function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <div className="container min-h-screen mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* {User Info Profile Section} */}
          <div className="flex items-center justify-between pr-10 pb-6 mb-6 border-b-2 text-md font-semibold">
            <div className="flex items-center gap-x-4">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="size-24 rounded-full object-cover"
                />
              ) : (
                <div className="size-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <IconUser stroke={2} className="size-5 text-white" />
                </div>
              )}
              <div className="flex flex-col gap-y-1">
                <h1 className="text-3xl">{currentUser.displayName}</h1>
                <h1>@JoanDuran1212</h1>
                <div className="flex gap-1 item-center">
                  <IconCalendar stroke={2} />
                  <h1>Joined Jun 2025</h1>
                </div>
              </div>
            </div>
            <button className="bg-white font-semibold border border-gray-200 px-4 py-1 rounded-xl hover:bg-gray-600 hover:text-white">
              Follow
            </button>
          </div>
          {/* Quick Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex gap-2 py-4 justify-center items-center shadow-md rounded-xl border border-gray-200">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="text-md font-semibold ">Attended:</h3>
              <p className="text-md font-semibold">3</p>
            </div>
            <div className="flex gap-2 py-4 justify-center items-center shadow-md rounded-xl border border-gray-200">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <h3 className="text-md font-semibold ">Upcoming:</h3>
              <p className="text-md font-semibold">2</p>
            </div>
            <div className="flex gap-2 py-4 justify-center items-center shadow-md rounded-xl border border-gray-200">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <h3 className="text-md font-semibold ">Hosted:</h3>
              <p className="text-md font-semibold">5</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
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
