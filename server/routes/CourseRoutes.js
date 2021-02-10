const router = require("express").Router();
const Course = require("../models/CourseModel");

router.post("/getCourseId", async (req, res) => {
  try {
    const courseObj = await Course.findOne({ courseName: req.body.name });

    res.send(courseObj);
  } catch (err) {
    // console.log(err.message);
    res.status(500).json("Error from server: " + err.message);
  }
});

router.post("/getcoursebyid", async (req, res) => {
  try {
    // console.log(course);
    const course = await Course.findById(req.body.id);
    console.log(course);
    res.send(course);
  } catch (err) {
    res.status(500).json("Error from server: " + err.message);
  }
});

module.exports = router;
