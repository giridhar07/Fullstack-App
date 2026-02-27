import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { XMarkIcon } from "@heroicons/react/24/outline"

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!event)
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Event not found
      </div>
    );

  const formatGoogleDate = (value) => {
    const date = new Date(value);
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const eventStart = new Date(event.date);
  const eventEnd = new Date(eventStart.getTime() + 60 * 60 * 1000);
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.name || "Event"
  )}&dates=${formatGoogleDate(eventStart)}/${formatGoogleDate(
    eventEnd
  )}&details=${encodeURIComponent(
    event.description || "Event details"
  )}&location=${encodeURIComponent(event.location || "")}`;

  return (
    <div className="h-140 bg-white p-6 flex justify-center">
      <div className="relative w-full max-w-3xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-8">
        {/* Event Title */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Close event details"
          className="absolute right-4 top-4 rounded-md px-2 py-1 text-xl font-bold text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-transparent bg-clip-text mb-4 text-center">
          {event.name}
        </h1>

        {/* Date & Location */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-700 mb-6">
          <p className="text-lg font-medium flex items-center gap-2">
            📅 {new Date(event.date).toLocaleDateString()}
          </p>
          <p className="text-lg font-medium flex items-center gap-2">
            📍 {event.location || "No location provided"}
          </p>
        </div>

        {/* Description */}
        <div className="bg-gray-50/70 p-5 rounded-xl shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            About This Event
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {event.description || "No description provided"}
          </p>
        </div>

        <div className="bg-gray-50/70 p-5 rounded-xl shadow-sm mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Add To Google Calendar
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Save this event to your Google Calendar so you do not miss it.
          </p>
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Add Event
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
