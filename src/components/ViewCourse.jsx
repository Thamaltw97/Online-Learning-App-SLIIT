import React, { Component, useEffect, useState } from "react";
import Axios from "axios";

const ViewCourse = () => {
  const [selectCourse, setSelectCourse] = useState([]);

  useEffect(() => {
    Axios.post("http://localhost:5000/api/course/getcoursebyid", {
      id: window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      ),
    })
      .then((res) => {
        setSelectCourse(res.data);
      })
      .catch((err) => {
        alert("Error in View Course Component !");
      });
    // console.log(localStorage.getItem("user-id"));
  }, []);

  const getFileName = (URL) => {
    let parts = URL.split("/");
    return parts.pop() || parts.pop();
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card m-4">
          <div className="card-body">
            <h5 className="card-title">
              {typeof selectCourse.courseName === "undefined"
                ? "Please select one course"
                : null}
              {selectCourse && selectCourse.courseName}
            </h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {selectCourse && selectCourse.courseDescription}
            </h6>
            {selectCourse.coursesMaterial &&
              selectCourse.coursesMaterial.map((materials) => (
                <div key={materials.lecture}>
                  <span className="badge badge-pill badge-primary mt-3 mb-3">
                    {materials.lecture}
                  </span>
                  <br />
                  {materials.materials.map((files) => (
                    <div key={files}>
                      <a
                        href={files}
                        className="card-link m-3"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="far fa-file-pdf"></i>
                        <span className="ml-4">{getFileName(files)}</span>
                      </a>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
