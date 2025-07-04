"use client";

import React, { useEffect, useState } from "react";
import EventCard from "../EventCard";
import ProtectedRoute from "../auth/ProtectedRoute";

const Home = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPreferences, setUserPreferences] = useState({
    categories: ["Technology", "Music"],
    location: "Boston",
    priceRange: "all",
  });
  const [showPreferences, setShowPreferences] = useState(false);

  const categories = [
    "Technology",
    "Music",
    "Art",
    "Food",
    "Sports",
    "Business",
    "Education",
    "Networking",
    "Other",
  ];
  const locations = [
    "New York",
    "San Francisco",
    "Chicago",
    "Los Angeles",
    "Boston",
  ];

  // Filter events based on user preferences
  const getRecommendedEvents = () => {
    return allEvents.filter((event) => {
      const matchesCategory = userPreferences.categories.includes(
        event.category
      );
      const matchesLocation =
        userPreferences.location === "all" ||
        event.location === userPreferences.location;
      const matchesPrice =
        userPreferences.priceRange === "all" ||
        event.price === userPreferences.priceRange;

      return matchesCategory && matchesLocation && matchesPrice;
    });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json().then((data) => {
          setRecommendedEvents(data);
          setLoading(false);
        });
        return data;
      } catch (error) {
        console.error("Error fetching events:", error);
        setRecommendedEvents([]);
      }
    };

    fetchEvents();
  }, [userPreferences]);

  const handlePreferenceChange = (type, value) => {
    if (type === "categories") {
      setUserPreferences((prev) => ({
        ...prev,
        categories: prev.categories.includes(value)
          ? prev.categories.filter((cat) => cat !== value)
          : [...prev.categories, value],
      }));
    } else {
      setUserPreferences((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen my-10">
        {/* Header */}
        <div className="sticky z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome Back!</h1>
                <p className="text-gray-600 mt-1">
                  Discover events tailored just for you
                </p>
              </div>
              <button
                onClick={() => setShowPreferences(!showPreferences)}
                className="flex items-center gap-2 px-4 py-2 transition-colors bg-gray-400 rounded-sm hover:text-white hover:bg-gray-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                  />
                </svg>
                Preferences
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Panel */}
        {showPreferences && (
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Preferences
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interested Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={userPreferences.categories.includes(
                            category
                          )}
                          onChange={() =>
                            handlePreferenceChange("categories", category)
                          }
                          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Location
                  </label>
                  <select
                    value={userPreferences.location}
                    onChange={(e) =>
                      handlePreferenceChange("location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={userPreferences.priceRange}
                    onChange={(e) =>
                      handlePreferenceChange("priceRange", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="free">Free Events</option>
                    <option value="paid">Paid Events</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-indigo-600"
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
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Recommended Events
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {recommendedEvents.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    Your Location
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {userPreferences.location}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interests</p>
                  <p className="text-xl font-bold text-gray-900">
                    {userPreferences.categories.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Events Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Recommended For You
            </h2>
            <p className="text-gray-600">
              Events matching your preferences and interests
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"></div>
                <div
                  className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-4 h-4 bg-indigo-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <span className="ml-2 text-gray-600">Loading events...</span>
              </div>
            </div>
          ) : recommendedEvents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
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
                  No recommended events found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your preferences to discover more events
                </p>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Update Preferences
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
