require("dotenv").config();
const app = require("./src/app");
// const express = require("express");
const PORT = process.env.PORT || 5000;
// const eventRoutes = require("./src/routes/eventRoutes");

// app.use(express.json()); // parse the json in the requests

// app.use("/events", eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});