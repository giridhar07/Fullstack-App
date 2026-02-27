const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventById,
  createEvent,
  editEvent,
  deleteEvent,
} = require('../controllers/eventController');

// const router = require("express").Router();
// const auth = require("../middleware/authMiddleware");
// const ctrl = require("../controllers/eventController");

// router.get("/", auth, ctrl.getEvents);
// router.post("/", auth, ctrl.createEvent);
// router.put("/:id", auth, ctrl.updateEvent);
// router.delete("/:id", auth, ctrl.deleteEvent);

router.get('/', getEvents);
router.get('/:id', getEventById);
router.post('/', createEvent);
router.put('/edit',editEvent);
router.delete('/:id', deleteEvent);

module.exports = router;