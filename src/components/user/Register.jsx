import React, { useState } from "react";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import LandImg from "../../images/landpage_img.svg";
import Axios from "axios";

const Register = () => {
  const history = useHistory();
  const [userRegObj, setUserRegObj] = useState({
    name: "",
    address: "",
    email: "",
    mobile: "",
    password: "",
  });

  //=== Handle input Fields onChange event ======
  const handleChange = (e) => {
    e.persist();
    setUserRegObj((userRegObj) => ({
      ...userRegObj,
      [e.target.name]: e.target.value,
    }));
  };

  //=== Function to submit the Registration form ==============================
  const submitForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      //API call to pass student details for registration
      Axios.post("http://localhost:5000/api/student/register", userRegObj)
        .then((res) => {
          localStorage.setItem("user-id", res.data._id);
          localStorage.setItem("user-name", res.data.name);
          localStorage.setItem("user-role", res.data.userRole);

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
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Something went wrong in register!",
            confirmButtonText: "OK",
          });
        });
    }
  };

  //==== Save object validation ==================
  const handleValidation = () => {
    if (userRegObj.name === "") {
      showValidationError("Please fill name!");
      return false;
    }
    if (userRegObj.address === "") {
      showValidationError("Please fill address!");
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

  //Show validation errors using sweetalert2
  const showValidationError = (errMsg) => {
    return Swal.fire({
      icon: "error",
      title: "Something went wrong in register!",
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
                Name
              </label>
              <input
                type="text"
                id="userName"
                className="form-control"
                placeholder="Enter Name"
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
