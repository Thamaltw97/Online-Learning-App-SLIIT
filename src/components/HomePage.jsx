import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import Img1 from "../images/ApplicationFrameworks.png";
import Img2 from "../images/DistributedSystems.jpg";
import Img3 from "../images/MachineLearning.jpeg";
import Img4 from "../images/AndroidDevelopment.jpg";
import Img5 from "../images/IosDevelopment.jpeg";
import Img6 from "../images/SoftwareArchitecture.png";

const HomePage = () => {
  const history = useHistory();
  const [courseList, setCourseList] = useState([]);
  const [subList, setSubList] = useState([]);

  useEffect(() => {
    //Get courses that are available to enroll
    Axios.post("http://localhost:5000/api/student/getstudentbyid", {
      id: localStorage.getItem("user-id"),
    })
      .then((res) => {
        setCourseList(res.data.courses);
        console.log(res.data.courses);
      })
      .catch((err) => {
        alert("Error in front-end!");
      });

    //Array to view all courses
    setSubList([
      {
        name: "Application Frameworks",
        desc:
          "This module intends to gather the knowledge in many areas of framework...",
        img: Img1,
        addClass: "",
      },
      {
        name: "Distributed Systems",
        desc:
          "This module intends to gather the knowledge in many areas of Distribut...",
        img: Img2,
        addClass: "",
      },
      {
        name: "Machine Learning",
        desc:
          "This module intends to gather the knowledge in many areas of MachineLe...",
        img: Img3,
        addClass: "disabled",
      },
      {
        name: "Android Development",
        desc:
          "This module intends to gather the knowledge in many areas of AndroidDe...",
        img: Img4,
        addClass: "disabled",
      },
      {
        name: "IOS Development",
        desc:
          "This module intends to gather the knowledge in many areas of IosDevelo...",
        img: Img5,
        addClass: "disabled",
      },
      {
        name: "Software Architecture",
        desc:
          "This module intends to gather the knowledge in many areas of SoftwareA...",
        img: Img6,
        addClass: "disabled",
      },
    ]);
  }, []);

  //==== Handle Enroll button click ===================================
  const onEnrollClick = (courseName) => {
    const courseObj = {
      name: courseName,
      courseUserId: localStorage.getItem("user-id"),
    };

    //Add the course to student profile as enrolled.
    Axios.post("http://localhost:5000/api/student/addcourse", courseObj)
      .then((res) => {
        history.push("/home/view/" + res.data._id);
        window.location.reload();
      })
      .catch((err) => {
        alert("Error in front-end!");
      });
  };

  //==== Handle Unenroll button click ==================================
  const onUnenrollClick = (courseName) => {
    const courseObj = {
      name: courseName,
      courseUserId: localStorage.getItem("user-id"),
    };

    //Remove the course from student profile.
    Axios.post("http://localhost:5000/api/student/removecourse", courseObj)
      .then((res) => {
        history.push("/home");
        window.location.reload();
      })
      .catch((err) => {
        alert("Error in front-end!");
      });
  };

  //==== Handle View button click ======================================
  const onViewClick = (courseName) => {
    //Get click course Id by name.
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

  //=== Function to return cards to view in Homepage ==================
  const fnGenSubListCard = () => {
    return (
      <>
        {subList.map((sub) => (
          <div className="col-lg-4 mb-5">
            <div className="card border-success">
              <div className="card-body">
                <img
                  src={sub.img}
                  alt={sub.name}
                  className="img-fluid rounded-circle w-75 mb-3"
                ></img>
                <h3>{sub.name}</h3>
                <p>{sub.desc}</p>
                {localStorage.getItem("user-id") != null ? (
                  courseList && courseList.length > 0 ? (
                    courseList.includes(sub.name) ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-warning"
                          onClick={() => onViewClick(sub.name)}
                        >
                          View
                        </button>
                        <span> </span>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => onUnenrollClick(sub.name)}
                        >
                          Unenroll
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        className={
                          sub.addClass === ""
                            ? "btn btn-success"
                            : "btn btn-light"
                        }
                        disabled={sub.addClass === "" ? false : true}
                        onClick={() => onEnrollClick(sub.name)}
                      >
                        {sub.addClass === "" ? "Enroll" : "Coming soon..."}
                      </button>
                    )
                  ) : (
                    <button
                      type="button"
                      className={
                        sub.addClass === ""
                          ? "btn btn-success"
                          : "btn btn-light"
                      }
                      disabled={sub.addClass === "" ? false : true}
                      onClick={() => onEnrollClick(sub.name)}
                    >
                      {sub.addClass === "" ? "Enroll" : "Coming soon..."}
                    </button>
                  )
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div id="packages">
      <div className="container my-3 py-3 text-center">
        <div className="row mb-5">
          <div className="col">
            <h1>Enrich your knowledge online</h1>
            <p>Grab the best online education platform in the country.</p>
          </div>
        </div>
        <div className="row">{fnGenSubListCard()}</div>
      </div>
    </div>
  );
};

export default HomePage;
