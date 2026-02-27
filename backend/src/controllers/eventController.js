const Event = require("../models/event");

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEvent = async (req, res) => {
  const { name, location, description, date, } = req.body;

     console.log("name",name,"date",date,"location",location,"description",description)
     if(!name || !location || !description || !date){
      return res.status(400).json({ error: 'All fields are required' });
     }
  const eventDate = new Date(date);
  const now = new Date();

  if (eventDate < now) {
    return res.status(400).json({ error: 'Event date must be in the future' });
  }

  try {
    const event = new Event({ name, date,location,description });

    console.log("event",event)
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editEvent = async (req, res) => {
   const {eventId} = req.query
  const { name, date,location,description } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    event.name = name;
    event.location = location;
    event.description = description;
    event.date = date;
    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  const deleted = await Event.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ msg: "Event not found" });
  res.json({ msg: "Deleted" });
};

// Backward-compatible alias for older route usage.
// exports.updateEvent = exports.updateEventById;
