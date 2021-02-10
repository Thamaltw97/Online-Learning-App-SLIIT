import React, { Component } from "react";
import Img1 from "../images/sri-lanka-eta-visa.jpg";
import Img2 from "../images/vatadage-temple-polonnaruwa_orig.jpg";
import Img3 from "../images/sigiriya-rock-fortress_1_orig.jpg";
import Img4 from "../images/kandy-street_1_orig.jpg";
import Img5 from "../images/gangaramaya-temple-colombo-670x447_orig.jpg";
import Img6 from "../images/temple-of-the-scared-tooth_1_orig.jpg";

const HomePage = () => {
  const onEnrollClick = (courseName) => {
    const courseObj = {
      name: courseName,
      courseUserId: localStorage.getItem("user-id"),
    };

    Axios.post("http://localhost:5000/api/course/getbyid", courseObj)
      .then((res) => {
        // setFormLoad(true);
        // localStorage.setItem('auth-token', res.data.token);
        history.push("/home/view/" + res.data._id);
      })
      .catch((err) => {
        // alert('Error: ' + err);
        alert("Error in front-end!");
      });
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

        <div className="row">
          <div className="col-lg-4">
            <div className="card border-success">
              <div className="card-body">
                <img
                  src={Img1}
                  alt=""
                  className="img-fluid rounded-circle w-75 mb-3"
                ></img>
                <h3>Application Frameworks</h3>
                <p>Application Frameworks</p>
                {}
                <button onClick={onEnrollClick("Application Frameworks")}>
                  Enroll
                </button>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-success">
              <div className="card-body">
                <img
                  src={Img2}
                  alt=""
                  className="img-fluid rounded-circle w-75 mb-3"
                ></img>
                <h3>Distributed Systems</h3>
                <p>Distributed Systems</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-success">
              <div className="card-body">
                <img
                  src={Img3}
                  alt=""
                  className="img-fluid rounded-circle w-75 mb-3"
                ></img>
                <h3>Machine Learning</h3>
                <p>Machine Learning</p>
              </div>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-lg-4">
            <div className="card border-success">
              <div className="card-body">
                <img
                  src={Img4}
                  alt=""
                  className="img-fluid rounded-circle w-75 mb-3"
                ></img>
                <h3>Android Development</h3>
                <p>Android Development</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-success">
              <div className="card-body">
                <img
                  src={Img5}
                  alt=""
                  className="img-fluid rounded-circle w-75 mb-3"
                ></img>
                <h3>IOS Development</h3>
                <p>IOS Development</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-success">
              <div className="card-body">
                <img
                  src={Img6}
                  alt=""
                  className="img-fluid rounded-circle w-75 mb-3"
                ></img>
                <h3>Software Architecture</h3>
                <p>Software Architecture</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
