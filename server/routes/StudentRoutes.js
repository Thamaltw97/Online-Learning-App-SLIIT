const router = require("express").Router();
const Student = require("../models/StudentModel");
const Course = require("../models/CourseModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Add Student
router.post("/register", async (req, res) => {
  try {
    let { name, address, email, mobile, password } = req.body;
    let userRole = "user";

    const existingUser = await Student.findOne({ email: email });
    if (existingUser)
      res
        .status(404)
        .json({ msg: "An account with this email already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await new Student({
      name,
      address,
      email,
      mobile,
      password: passwordHash,
      userRole,
    }).save();

    res.json(newUser);
  } catch (exception) {
    res.status(500).json("Error from server:" + exception.message);
    console.log(exception);
  }
});

//Login Student
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validate
    const student = await Student.findOne({ email: email });
    // console.log(student);
    if (!student) return res.status(404).json({ msg: "Email is incorrect !" });

    // Check password
    const isMatch = await bcrypt.compare(password, student.password);

    if (!isMatch)
      return res.status(404).json({ msg: "Password is incorrect !" });

    const token = jwt.sign({ id: student._id }, process.env.TOKEN_SECRET);

    res.json({
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        mobile: student.mobile,
        country: student.country,
        userRole: student.userRole,
      },
    });
  } catch (exception) {
    res.status(500).json("Error from server: " + exception.message);
  }
});

//Get student by Id.
router.post("/getstudentbyid", async (req, res) => {
  try {
    const student = await Student.findById(req.body.id);
    res.send(student);
  } catch (error) {
    res.status(500).json("Error from server: " + error.message);
  }
});

//Enroll to course
router.post("/addcourse", async (req, res) => {
  try {
    const student = await Student.findById(req.body.courseUserId);
    student.courses.push(req.body.name);
    await student.save();

    const courseObj = await Course.findOne({ courseName: req.body.name });
    res.send(courseObj);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Error from server: " + err.message);
  }
});

//Unenroll from a course
router.post("/removecourse", async (req, res) => {
  try {
    const student = await Student.findById(req.body.courseUserId);
    student.courses.pop(req.body.name);
    await student.save();

    res.send(student);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Error from server: " + err.message);
  }
});

module.exports = router;
