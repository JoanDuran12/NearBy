"use client";

import React, { useState } from "react";
import EventCard from "../EventCard";
import ProtectedRoute from "../auth/ProtectedRoute";

const mockEvents = [
  {
    id: 1,
    title: "React Conference 2024",
    date: "2024-07-10",
    location: "New York",
    description: "A conference about React and related technologies.",
  },
  {
    id: 2,
    title: "JavaScript Meetup",
    date: "2023-12-15",
    location: "San Francisco",
    description: "Meetup for JavaScript enthusiasts.",
  },
  {
    id: 3,
    title: "Tech Expo",
    date: "2024-08-20",
    location: "Chicago",
    description: "Annual technology exposition.",
  },
  {
    id: 4,
    title: "Tech Expo",
    date: "2024-08-20",
    location: "Chicago",
    description: "Annual technology exposition.",
  },
  {
    id: 5,
    title: "Tech Expo",
    date: "2024-08-20",
    location: "Chicago",
    description: "Annual technology exposition.",
  },
];

const isPastEvent = (date) => new Date(date) < new Date();

export default function Events() {
  const [showPast, setShowPast] = useState(false);

  const filteredEvents = mockEvents.filter((event) =>
    showPast ? isPastEvent(event.date) : !isPastEvent(event.date)
  );

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br flex flex-col">
        {/* Header Section */}
        <div className="flex-shrink-0 p-6 pb-4">
          <div className="max-w-6xl mx-auto">
            {/* Toggle Button */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setShowPast(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !showPast
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Current Events
                </button>
                <button
                  onClick={() => setShowPast(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    showPast
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Past Events
                </button>
              </div>
            </div>

            {/* Section Title */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">
                {showPast ? "Past Events" : "Upcoming Events"}
              </h1>
              <p className="text-gray-600 text-lg">
                {showPast
                  ? "Relive memorable moments from our previous events"
                  : "Don't miss out on our exciting upcoming events"}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 px-6 pb-6">
          <div className="max-w-6xl mx-auto">
            {filteredEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-64">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No {showPast ? "past" : "upcoming"} events
                  </h3>
                  <p className="text-gray-500">
                    {showPast
                      ? "No past events to display at the moment."
                      : "Stay tuned for exciting upcoming events!"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
