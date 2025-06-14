export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 mb-4 w-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {event.title}
      </h2>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {new Date(event.date).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
