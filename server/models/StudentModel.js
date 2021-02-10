const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },

  address: {
    type: String,
    required: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  mobile: {
    type: String,
    minlength: 10,
    maxlength: 10,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  userRole: {
    type: String,
    default: "user",
  },

  courses: [],
});

module.exports = mongoose.model("Student", studentSchema);
