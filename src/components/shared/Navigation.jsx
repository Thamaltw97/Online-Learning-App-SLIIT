import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

const Navigation = () => {
  const history = useHistory();
  const [courseList, setCourseList] = useState([]);
  const [name, setName] = useState(localStorage.getItem("user-name"));

  useEffect(() => {
    //API call to get current logged student's courses
    Axios.post("http://localhost:5000/api/student/getstudentbyid", {
      id: localStorage.getItem("user-id"),
    })
      .then((res) => {
        setCourseList(res.data.courses);
      })
      .catch((err) => {
        alert("Error in Navigation bar front-end !");
      });
  }, []);

  //=== Handle drop down item click event =======================
  const onViewClick = (courseName) => {
    Axios.post("http://localhost:5000/api/course/getCourseId", {
      name: courseName,
    })
      .then((res) => {
        history.push("/home/view/" + res.data._id);
      })
      .catch((err) => {
        alert("Error in front-end!");
      });
  };

  //=== Function to trigger when logout happens =============
  const btnLogOut = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user-id");
    localStorage.removeItem("user-role");
    localStorage.removeItem("user-name");
    Swal.fire({
      title: "User logged out successfully!",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.value) {
        history.push("/");
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <span className="navbar-brand mb-0 h1">Online Learning Platform </span>
      <ul className="navbar-nav my-2 my-lg-0 ml-auto">
        <span
          className="badge badge-pill badge-light mb-3"
          style={{ marginTop: "12px", marginRight: "15px" }}
        >
          <span style={{ color: "#000", textAlign: "center" }}>
            {<i className="fas fa-user-circle"></i>}
            <span> </span>
            {name}
          </span>
        </span>
        <li className="nav-item">
          <Link className="nav-link" to="/home">
            Home
          </Link>
        </li>
        <span> </span>
        <li
          class="dropdown"
          style={{ marginBottom: "-10px", marginTop: "-7px" }}
        >
          <div class="navbar-form">
            <Link class="nav-link">
              <a
                class="btn btn-default dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                style={{ color: "#FFFFFF" }}
              >
                My Courses <span class="caret"></span>
              </a>
              <ul class="dropdown-menu">
                {courseList && courseList.length > 0 ? (
                  courseList.map((course) => {
                    return (
                      <li>
                        <Link
                          className="nav-link"
                          style={{ color: "#000000" }}
                          onClick={() => onViewClick(course)}
                        >
                          {course}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <Link className="nav-link" style={{ color: "#000000" }}>
                    No Courses...
                  </Link>
                )}
              </ul>
            </Link>
          </div>
        </li>
        <span> </span>
        <Link className="nav-link" to="/" onClick={btnLogOut}>
          {<i className="fas fa-sign-in-alt"></i>}
          <span> </span>
          SignOut
        </Link>
      </ul>
      <form className="form-inline my-2 my-lg-0 ml-5">
        <a href="https://github.com/Thamaltw97/Online-Learning-App-SLIIT">
          <h3>
            <span className="fa fa-github"></span>
          </h3>
        </a>
      </form>
    </nav>
  );
};
export default Navigation;
