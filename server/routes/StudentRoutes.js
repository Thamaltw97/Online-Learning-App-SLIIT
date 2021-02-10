const router = require("express").Router();
const Student = require("../models/StudentModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//Add Student 
router.post("/register", async (req, res) => {
    try {

        console.log("Good Morning !");

        let {name, address, email, mobile, password} = req.body;
        let userRole = "user";

        // const existingUser =  await Student.findOne({email: email})
        // console.log(existingUser);
        // if (existingUser)
        //     res.status(404).json({msg: "An account with this email already exists"});

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        console.log(passwordHash);

        const newUser = await new Student({
            name,
            address,
            email,
            mobile,
            password: passwordHash,
            userRole
        }).save();

        console.log(newUser);

        // const savedUser = await newUser.save();
        res.json(newUser);

    } catch (exception) {
        res.status(500).json('Error from server:' + exception.message);
        console.log(exception);
    }
});


//Login Student
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        //Validate
        const student = await Student.findOne({email: email});
        console.log(student);
        if(!student)
            return res.status(404).json({msg: "Email is incorrect !"});

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            student.password
        );

        console.log(isMatch);

        if(!isMatch)
            return res.status(404).json({msg: "Password is incorrect !"});

        const token = jwt.sign({id: student._id}, process.env.TOKEN_SECRET);

        console.log(token);

        res.json({
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                mobile: student.mobile,
                country: student.country,
                userRole: student.userRole
            }
        })
    }
    catch(exception){
        res.status(500).json('Error from server:' + exception.message);
    }
});


module.exports = router;