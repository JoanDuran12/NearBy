"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendarFilled,
  IconClock,
  IconMapPin,
  IconDoorExit,
} from "@tabler/icons-react";

export default function EventDetailsPage() {
  const params = useParams();
  const { currentUser } = useAuth(); // Auth
  const [event, setEvent] = useState(null); // Store the event data
  const [loading, setLoading] = useState(true); // Loading Screen
  const [error, setError] = useState(null); // Error Screen
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Pop Up Leave Event Confirmation
  const [isRegistered, setIsRegistered] = useState(null); // User is registered?
  const [isHost, setIsHost] = useState(false); // User is Host of the event

  // Convert standard 24 time to 12H AM/PM
  function formatTimeToAMPM(timeStr) {
    // timeStr is "HH:MM:SS"
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hour}:${minute} ${ampm}`;
  }

  // Fetch event data and event registration status
  useEffect(() => {
    async function fetchData() {
      if (!params.id || !currentUser?.uid) return;

      try {
        setLoading(true);

        // Fetch event data
        const eventRes = await fetch(
          `http://localhost:5000/api/events/${params.id}`,
          {
            cache: "no-store",
          }
        );

        if (!eventRes.ok) {
          throw new Error("Event not found");
        }

        const eventData = await eventRes.json();
        setEvent(eventData);

        // Fetch registration status
        const regRes = await fetch(
          `http://localhost:5000/api/atendees/${currentUser.uid}/${params.id}`
        );

        if (regRes.status === 404) {
          setIsRegistered(false);
          setIsHost(false);
        } else if (!regRes.ok) {
          throw new Error("Failed to check registration");
        } else {
          const regData = await regRes.json();
          setIsRegistered(true);
          setIsHost(!!regData.isHost);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  // Register user to event
  const registerToEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/atendees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isHost: false,
          eventId: params.id,
          firebaseUid: currentUser.uid,
        }),
      });

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setIsRegistered(true);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Unregister user from the event
  const leaveEvent = async (e) => {
    e.preventDefault();
    setIsDropdownOpen(false);

    try {
      const response = await fetch(
        `http://localhost:5000/api/atendees/${currentUser.uid}/${params.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log(await response.json());
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      setIsRegistered(false);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  if (loading) return <div>Loading event...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!event) return <div>Event not found</div>;

  return (
    <div className="container min-h-screen my-10 mx-auto px-4 max-w-4xl">
      <Link
        href="/home"
        className="flex gap-2 items-center mb-8 text-blue-600 hover:underline"
      >
        <IconArrowLeft stroke={2} />
        <span>Back to Events</span>
      </Link>
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-lg rounded-xl p-6">
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center items-start">
          <img
            src={event?.eventPic || "/placeholder.jpg"}
            alt={event?.eventName || "Event image"}
            className="rounded-xl w-full h-auto max-h-[250px] object-cover border"
          />
        </div>
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <h2 className="font-bold text:xl md:text-2xl mb-2 break-words leading-tight">
            {event.eventName || "Event Name"}
          </h2>
          <div className="flex flex-col gap-3 mb-4 text-sm md:text-md xl:text-base">
            <div className="flex items-center ">
              <IconCalendarFilled className="text-blue-500 mr-2" />
              <span>
                <span className="font-semibold">Start:</span>{" "}
                {new Date(event.startDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="mx-2">|</span>
              <span>
                <span className="font-semibold">End:</span>{" "}
                {new Date(event.endDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center">
              <IconClock className="text-blue-500 mr-2" />
              <span>
                <span className="font-semibold">From:</span>{" "}
                {event.startTime ? formatTimeToAMPM(event.startTime) : "N/A"}
              </span>
              <span className="mx-2">|</span>
              <span>
                <span className="font-semibold">To:</span>{" "}
                {event.endTime ? formatTimeToAMPM(event.endTime) : "N/A"}
              </span>
            </div>
            <div className="flex items-center">
              <IconMapPin className="text-blue-500 mr-2" />
              <span>{event.location || "N/A"}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {event.category || "N/A"}
              </span>
              {isRegistered ? (
                <button
                  onClick={() => {
                    setIsDropdownOpen(true);
                  }}
                  className="font-semibold text-sm px-3 py-2 rounded-md bg-red-500 hover:underline"
                >
                  Leave Event
                </button>
              ) : (
                <button
                  onClick={registerToEvent}
                  className="font-semibold text-sm px-3 py-2 rounded-md bg-gray-300 hover:underline"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-xl bg-white p-6 mt-8">
        <h3 className="font-bold text-md md:text-xl mb-2">About event:</h3>
        <p className="text-gray-700 text-sm md:text-base ">
          {event.description || "No description available."}
        </p>
      </div>

      {/* Leave Event Confirmation Modal */}
      {isDropdownOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs bg-opacity-50 z-50">
          <div className="flex flex-col w-[500px] h-[300px] p-8 bg-white rounded-xl shadow-lg border border-gray-300 justify-center items-center">
            <h1 className="mb-4 text-2xl font-semibold text-red-500">
              Cancel Registrarion
            </h1>
            <p className="mb-8 text-center">
              Click on the confirm button below to cancel your registration.
            </p>
            <div className="flex justify-center items-center gap-8">
              <button
                onClick={leaveEvent}
                className="flex justify-center items-center font-semibold text-sm px-3 py-2.5 rounded-md bg-red-500 hover:underline"
              >
                <IconDoorExit stroke={2} />
                Confirm
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                }}
                className="font-semibold text-sm px-5 py-3 rounded-md bg-gray-300 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
