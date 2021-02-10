import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import LandImg from "../../images/landpage_img.svg";
import Axios from "axios";

// import SiteLoading from "./shared/Loading/SiteLoading";
// import { PostApiCaller } from "../services/ApiCaller";

const Login = () => {
  const history = useHistory();
  const [formLoad, setFormLoad] = useState(true);
  const [userObj, setUserObj] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.persist();
    setUserObj((userObj) => ({
      ...userObj,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {

    Axios.post('http://localhost:5000/api/student/login', userObj)
    .then(res => {
      // setFormLoad(true);
      // localStorage.setItem('auth-token', res.data.token);
      localStorage.setItem('user-id', res.data.student.id);
      localStorage.setItem('user-name', res.data.student.name);
      localStorage.setItem('user-role', res.data.student.userRole);
      history.push("/home");
    })
    .catch(err => {
        // alert('Error: ' + err);
        alert("Sorry..Login Failed. Please check your e-mail and password");
    });

    }
  };

  const handleValidation = () => {
    if (userObj.email === "") {
      showValidationError("Please fill user email!");
      return false;
    }
    if (userObj.password === "") {
      showValidationError("Please fill user password!");
      return false;
    }
    if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userObj.email))) {
      showValidationError("Please check your email!");
      return false;
    }
    return true;
  };

  const showValidationError = (errMsg) => {
    return Swal.fire({
      icon: "error",
      title: "Something went wrong in login!",
      text: errMsg,
    });
  };

  return (
    <div className="row container-fluid">
      {/* <div className="col-md-3">{!formLoad && <SiteLoading />}</div> */}
      <div className="col-md-12 mt-4">
      <div className="row justify-content-center" style={{fontFamily: "sans-serif"}}>
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
              id="userEmail"
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
              id="userPassword"
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
