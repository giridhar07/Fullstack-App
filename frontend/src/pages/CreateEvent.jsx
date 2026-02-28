import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { toast } from "react-toastify";
 import { useAuth } from "../context/UserContext.jsx";

const CreateEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

   const {user} = useAuth()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to create an event.");
      return navigate("/login");
    }

    if (!name || !location || !description || !date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("https://fullstack-app-cra5.onrender.com/api/events", {
        name,
        location,
        description,
        date,
      });

      toast.success("🎉 Event created successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Toast container */}
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Create Event
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl px-6 py-8 max-w-lg mx-auto"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="name"
          >
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter event name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="date"
          >
            Event Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="location"
          >
            Event Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter event location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Event Description
          </label>
          <textarea
            id="description"
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow border rounded-lg w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Creating...
            </>
          ) : (
            "Create Event"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;

