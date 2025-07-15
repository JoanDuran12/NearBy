"use client";

import React, { useState, useEffect } from "react";
import EventCard from "../EventCard";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useAuth } from "@/app/contexts/AuthContext";

const isPastEvent = (date) => {
  return new Date(date) < new Date();
};

export default function Events() {
  const { currentUser } = useAuth(); // Auth
  const [myEventData, setMyEventData] = useState(null); // User Event Data
  const [showPast, setShowPast] = useState(false); // Show past event
  const [loading, setLoading] = useState(true); // Loading Screen
  const [error, setError] = useState(null); // Error Screen

  useEffect(() => {
    async function fetchMyEventsData() {
      if (!currentUser?.uid) return;

      try {
        setLoading(true);

        // Fetch user registered / attended events
        const myEventFetch = await fetch(
          `http://localhost:5000/api/atendees/${currentUser.uid}`
        );

        if (!myEventFetch.ok) {
          throw new Error("Failed to get the user events data");
        }

        const myConfirmedEvents = await myEventFetch.json();

        // Fetch Event Details
        const myEventDetails = await Promise.all(
          myConfirmedEvents.map(async (item) => {
            const response = await fetch(
              `http://localhost:5000/api/events/${item.eventId}`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch event " + item.eventId);
            }

            return response.json();
          })
        );

        setMyEventData(myEventDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMyEventsData();
  }, []);

  // Filter user event based on hosting date
  const filteredEvents = myEventData?.filter((event) => {
    return showPast ? isPastEvent(event.endDate) : !isPastEvent(event.endDate);
  });

  if (loading) return <div>Loading event...</div>;
  if (error) return <div>Error: {error}</div>;
  // if (!event) return <div>Event not found</div>;

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
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
