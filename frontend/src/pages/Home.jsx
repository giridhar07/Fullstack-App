import React from "react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { toast } from "react-toastify"
import { useAuth } from "../context/UserContext.jsx"
import { useNavigate } from "react-router-dom"
 

const Home = () => {
  // Data
  const [events, setEvents] = useState([])
  //const [notifications, setNotifications] = useState([])

   const navigate = useNavigate()

  const {user,} = useAuth()


  // Fetch/loading states
  const [loadingEvents, setLoadingEvents] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 6

  // Delete modal
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Edit modal
  const [showEdit, setShowEdit] = useState(false)
  const [savingEdit, setSavingEdit] = useState(false)
  const [editForm, setEditForm] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
  })

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    setLoadingEvents(true)
    try {
      const res = await axios.get("https://fullstack-app-cra5.onrender.com/api/events")
      setEvents(res.data)
    } catch (err) {
      console.error(err)
      toast.error("Failed to load events.")
    } finally {
      setLoadingEvents(false)
    }
  }



  const handleDelete = async () => {
    if(!user){
        toast.error("You must be logged in to delete an event.")
        return navigate('/login')
    }
    if (!selectedEvent) return
    setDeleting(true)
    try {
      await axios.delete(`https://fullstack-app-cra5.onrender.com/api/events/${selectedEvent._id}`)
      toast.success("Event deleted successfully 🎉")
      await fetchEvents()
      setShowDelete(false)
    } catch (error) {
      toast.error("Failed to delete event. Please try again.")
      console.error(error)
    } finally {
      setDeleting(false)
      setSelectedEvent(null)
    }
  }

  const openEdit = (evt) => {
    setSelectedEvent(evt)
    setEditForm({
      name: evt.name,
      location: evt.location,
      description: evt.description,
      date: new Date(evt.date).toISOString().slice(0, 10),
    })
    setShowEdit(true)
  }

  const handleEditSubmit = async (e) => {

         if(!user){
        toast.error("You must be logged in to delete an event.")
        return navigate('/login')
    }

    e.preventDefault()
    if (!selectedEvent) return
    setSavingEdit(true)
    try {
      await axios.put(`https://fullstack-app-cra5.onrender.com/api/events/edit?eventId=${selectedEvent?._id}`, {
        name: editForm.name.trim(),
        location: editForm.location,
        description: editForm.description,
        date: editForm.date,
      })
      toast.success("Event updated successfully ✅")
      await fetchEvents()
      setShowEdit(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update event. Please try again.")
    } finally {
      setSavingEdit(false)
      setSelectedEvent(null)
    }
  }
   
    const indexOfLastEvent = currentPage * eventsPerPage
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)
    

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-pretty text-3xl font-extrabold text-gray-900 sm:text-4xl">Events</h1>
        </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentEvents.map((event) => (
              <div
                key={event._id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow transition hover:shadow-lg"
              >
                <h2 className="mb-2 text-2xl font-semibold text-gray-900">{event.name}</h2>
                <p className="mb-4 text-sm text-gray-600">Location: {event.location}</p>
                <p className="mb-4 text-sm text-gray-600">Description: {event.description}</p>
                <p className="mb-2 text-sm text-gray-600">Date: {new Date(event.date).toLocaleDateString()}</p>

                <div className="flex gap-3">
                  <Link to={`/event/${event._id}`}>
                    <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">
                      View
                    </button>
                  </Link>
                  <button
                    onClick={() => openEdit(event)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEvent(event)
                      setShowDelete(true)
                    }}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
      

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-title"
        >
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="delete-title" className="text-lg font-bold text-gray-900">
                Confirm Delete
              </h2>
              <button
                onClick={() => setShowDelete(false)}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close delete dialog"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <p className="mb-6 text-sm text-gray-700">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">{selectedEvent?.name || "this event"}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDelete(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting && (
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Edit Modal */}
      {showEdit && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-title"
        >
          <form onSubmit={handleEditSubmit} className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="edit-title" className="text-lg font-bold text-gray-900">
                Edit Event
              </h2>
              <button
                onClick={() => setShowEdit(false)}
                type="button"
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close edit dialog"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Event name"
                />
              </div>

              <div>
                <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm((f) => ({ ...f, date: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

               <div>
                <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
                  location
                </label>
                <input
                  id="location"
                  type="location"
                  value={editForm.location}
                  onChange={(e) => setEditForm((f) => ({ ...f, location: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>


                  <div>
                <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                  description
                </label>
                <input
                  id="description"
                  type="description"
                  value={editForm.description}
                  onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingEdit}
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
              >
                {savingEdit && (
                  <svg
                    className="mr-2 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {savingEdit ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
   </div>
  )
}

export default Home

