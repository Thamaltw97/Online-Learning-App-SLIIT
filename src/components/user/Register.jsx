import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import LandImg from "../../images/landpage_img.svg";
import Axios from "axios";

// import SiteLoading from "./shared/Loading/SiteLoading";
// import { GetApiCaller, PostApiCaller } from "../services/ApiCaller";

const Register = () => {
  const history = useHistory();
//   const [courses, setCourses] = useState([]);
  const [formLoad, setFormLoad] = useState(false);
  const [userRegObj, setUserRegObj] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    password: ""
  });

//   useEffect(() => {
//     GetApiCaller("http://localhost:8080/api/coursematerial/getCourses").then(
//       (res) => {
//         if (res.status) {
//           setCourses(res.data.data);
//           setFormLoad(true);
//         }
//       }
//     );
//   }, []);

//   const selectCourses = (e) => {
//     let courseList = userRegObj.courseList;
//     courseList.push(e.target.value);

//     setUserRegObj((userRegObj) => ({
//       ...userRegObj,
//       [userRegObj.courseList]: courseList,
//     }));
//   };

  const handleChange = (e) => {
    e.persist();
    setUserRegObj((userRegObj) => ({
      ...userRegObj,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {

    Axios.post('http://localhost:5000/api/student/register', userRegObj)
    .then(res => {
        
        // localStorage.setItem('auth-token', res.data.token);
        localStorage.setItem('user-id', res.data._id);
        localStorage.setItem('user-name', res.data.name);
        localStorage.setItem('user-role', res.data.userRole);
        //   setFormLoad(true);
          Swal.fire({
            title: "Sucessfully Registered!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Sign In Now",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              history.push("/login");
            }
          });

    })
    .catch(err => {
        // alert('Error: ' + err);
        alert("Sorry..Login Failed. Please check your e-mail and password");
    });

    }

  };

  const handleValidation = () => {
    if (userRegObj.name === "") {
      showValidationError("Please fill user name!");
      return false;
    }
    if (userRegObj.address === "") {
      showValidationError("Please fill user address!");
      return false;
    }
    if (userRegObj.email === "") {
      showValidationError("Please fill email!");
      return false;
    }
    if (userRegObj.mobile === "") {
      showValidationError("Please fill mobile no!");
      return false;
    }
    if (userRegObj.password === "") {
      showValidationError("Please fill password!");
      return false;
    }
    return true;
  };

  const showValidationError = (errMsg) => {
    return Swal.fire({
      icon: "error",
      title: "Something went wrong in register!",
      text: errMsg,
    });
  };

  return (
    <div className="row container-fluid">
      {/* <div className="col-md-3">{!formLoad && <SiteLoading />}</div> */}
      <div className="col-md-12 mt-4">
      <div className="row justify-content-center" style={{fontFamily: "sans-serif"}}>
          <h1>Register Now !</h1>
      </div>
      </div>
      
      <div className="col-md-6">
        <img src={LandImg} className="landImg"></img>
      </div>
      <div className="col-md-1"></div>
      <div className="col-md-4 mt-2">
      <div className="card card-body my-0 bg-light">
        <form>
          <div className="form-group">
            <label htmlFor="userName" className="text-light">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              className="form-control"
              placeholder="Enter Username"
              autoComplete="off"
              value={userRegObj.name}
              onChange={handleChange}
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userAddress" className="text-light">
              User Address
            </label>
            <input
              type="text"
              id="userAddress"
              className="form-control"
              placeholder="Enter Address"
              autoComplete="off"
              value={userRegObj.address}
              onChange={handleChange}
              name="address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userEmail" className="text-light">
              User Email
            </label>
            <input
              type="email"
              id="userEmail"
              className="form-control"
              placeholder="Enter Email"
              autoComplete="off"
              value={userRegObj.email}
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userMobile" className="text-light">
              User Mobile
            </label>
            <input
              type="text"
              id="userMobile"
              className="form-control"
              placeholder="Enter Mobile"
              autoComplete="off"
              value={userRegObj.mobile}
              onChange={handleChange}
              name="mobile"
            />
          </div>
          <div className="form-group">
            <label htmlFor="userPassword" className="text-light">
              User Password
            </label>
            <input
              type="password"
              id="userPassword"
              className="form-control"
              placeholder="Enter Password"
              autoComplete="off"
              value={userRegObj.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          {/* {courses.map((course) => (
            <div className="form-check" key={course._id}>
              <input
                className="form-check-input"
                type="checkbox"
                value={course._id}
                id={course._id}
                onChange={selectCourses}
              />
              <label
                className="form-check-label text-light"
                htmlFor={course._id}
              >
                {course.courseName}
              </label>
            </div>
          ))} */}
          <button
            type="submit"
            className="btn btn-primary btn-block font-weight-bold mt-4 mb-4"
            onClick={submitForm}
          >
            Register Now
          </button>
        </form>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default Register;
