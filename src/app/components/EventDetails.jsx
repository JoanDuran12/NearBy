"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  IconArrowLeft,
  IconCalendarFilled,
  IconClock,
  IconMapPin,
} from "@tabler/icons-react";

export default function EventDetailsPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function formatTimeToAMPM(timeStr) {
    // timeStr is "HH:MM:SS"
    const [hourStr, minute] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12; // Convert 0 to 12 for 12 AM
    return `${hour}:${minute} ${ampm}`;
  }

  useEffect(() => {
    async function fetchEvent() {
      if (!params.id) return;

      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/events/${params.id}`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Event not found");
        }

        const eventData = await res.json();
        setEvent(eventData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [params.id]);

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
              <button className="font-semibold text-sm px-3 py-2 rounded-md bg-gray-300 hover:underline">
                Register
              </button>
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
    </div>
  );
}
