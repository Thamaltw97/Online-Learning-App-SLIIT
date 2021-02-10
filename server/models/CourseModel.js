const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  courseDescription: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  coursesMaterial: [
    {
      lecture: {
        type: String,
        required: true,
      },
      materials: [],
    },
  ],
});

module.exports = mongoose.model("course", courseSchema, "courses");
