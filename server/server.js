// Import Packages
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Init express app
const app = express();

// Env file config
dotenv.config();

// Config PORT
const PORT = 5000;

//Connect DB
mongoose.connect(
  process.env.DB_CONTEXT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Connected to the mongodb");
  }
);

// Middlewares
app.use(express.json());
app.use(
  cors({
    exposedHeaders: "auth-token",
  })
);

// Import routes
const StudentRoutes = require("./routes/StudentRoutes");
const CourseRoutes = require("./routes/CourseRoutes");

// Config routes
app.use("/api/student/", StudentRoutes);
app.use("/api/course/", CourseRoutes);

// Config static URL path
app.use("/document", express.static("docs"));

// Start server
app.listen(PORT, () => {
  console.log(`Server is up and running on server on ${PORT}`);
});
