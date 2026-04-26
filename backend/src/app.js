const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://fullstack-event-app.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

module.exports = app;
