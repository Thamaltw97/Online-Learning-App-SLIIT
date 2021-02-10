import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import LandImg from "../../images/landpage_img.svg";
import Axios from "axios";

const Login = () => {
  const history = useHistory();
  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
  });
  const [student, setStudent] = useState({});

  //=== Handle input Fields onChange event ======
  const handleChange = (e) => {
    e.persist();
    setUserObj((userObj) => ({
      ...userObj,
      [e.target.name]: e.target.value,
    }));
  };

  //=== Function to submit the Login form =============================
  const submitForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      //API call to pass user details for login
      Axios.post("http://localhost:5000/api/student/login", userObj)
        .then((res) => {
          localStorage.setItem("user-id", res.data.student.id);
          localStorage.setItem("user-name", res.data.student.name);
          localStorage.setItem("user-role", res.data.student.userRole);
          setStudent(res.data.student);
          Swal.fire({
            title: "Successfully Logged in!",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "OK",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.value) {
              history.push("/home");
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Something went wrong in login!",
            confirmButtonText: "OK",
          });
        });
    }
  };

  //==== Save object validation ==================
  const handleValidation = () => {
    if (userObj.email === "") {
      showValidationError("Please fill user email!");
      return false;
    }
    if (userObj.password === "") {
      showValidationError("Please fill user password!");
      return false;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userObj.email)) {
      showValidationError("Please check your email!");
      return false;
    }
    return true;
  };

  //Show validation errors using sweetalert2
  const showValidationError = (errMsg) => {
    return Swal.fire({
      icon: "error",
      title: "Something went wrong in login!",
      text: errMsg,
    });
  };

  return (
    <div className="row container-fluid">
      <div className="col-md-12 mt-4">
        <div
          className="row justify-content-center"
          style={{ fontFamily: "sans-serif" }}
        >
          <h1>Login !</h1>
        </div>
      </div>

      <div className="col-md-6 mt-5">
        <img src={LandImg} className="landImg"></img>
      </div>
      <div className="col-md-1"></div>
      <div className="col-md-4 mt-5">
        <div className="card card-body my-0 bg-light">
          <form>
            <div className="form-group">
              <label htmlFor="userEmail" className="text-light">
                User Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter Email"
                autoComplete="off"
                value={userObj.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="userMobile" className="text-light">
                User Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter Password"
                autoComplete="off"
                value={userObj.username}
                onChange={handleChange}
                name="password"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block font-weight-bold mt-4 mb-4"
              onClick={submitForm}
            >
              Login Now
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
};

export default Login;
