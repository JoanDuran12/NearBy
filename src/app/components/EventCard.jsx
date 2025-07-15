import Link from "next/link";
import { formatTimeToAMPM } from "@/app/components/EventDetails";

export default function EventCard({ event }) {
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <Link href={`/events/${event.eventId}`}>
      <div className="w-[400px] max-w-sm mx-auto rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 mb-6 border border-gray-400">
        <div className="p-2 bg-white h-full flex flex-col justify-between">
          <img
            className="rounded-xl w-full h-auto max-h-[250px] mb-4"
            src={`/events/${event.eventPic}`}
            alt="Event Image"
          />
          <div className="px-2">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="inline-block w-2 h-6 bg-indigo-500 rounded-full"></span>
              {event.eventName && event.eventName.length > 24
                ? truncateText(event.eventName, 24)
                : event.eventName}
            </h2>
            <p className="text-gray-700 line-clamp-2 md:line-clamp-3 text-sm md:text-base">
              {event.description && event.description.length > 100
                ? truncateText(event.description, 100)
                : event.description}
            </p>
          </div>
          <div className="flex items-center justify-between mt-4 px-2 py-1">
            <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
              {new Date(event.startDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at {event.startTime ? formatTimeToAMPM(event.startTime) : "N/A"}
            </span>
            <Link
              href={`/events/${event.eventId}`}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200 text-sm font-medium hover:bg-gray-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}
