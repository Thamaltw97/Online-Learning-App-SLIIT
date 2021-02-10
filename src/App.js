import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Swal from "sweetalert2";

import Navigation from "./components/shared/Navigation";
import GuestNav from "./components/shared/GuestNav";
import HomePage from "./components/HomePage";
import ViewCourse from "./components/ViewCourse";
import Register from "./components/user/Register";
import Login from "./components/user/Login";

function App() {
  const history = useHistory();
  let [loggedNavStatus, setLoggedNavStatus] = useState("user");

  useEffect(() => {
    if (window.location.href.match(/login.*/)) {
      setLoggedNavStatus("guest");
    } else if (window.location.href.match(/register.*/)) {
      setLoggedNavStatus("guest");
    }
  }, []);

  //== Function to validate Login =========
  const validateLogin = (component) => {
    if (component === "/") {
      setLoggedNavStatus("guest");
      return <HomePage />;
    } else if (localStorage.getItem("user-role") === "user") {
      setLoggedNavStatus("user");
      return <HomePage />;
    } else {
      Swal.fire({
        icon: "error",
        title: "No user logged in yet.!",
      }).then(() => {
        history.push("/");
      });
    }
  };

  return (
    <div className="App">
      {
        <div>
          <Router>
            {loggedNavStatus === "guest" ? <GuestNav /> : <Navigation />}
            <div>
              <Switch>
                <Route exact path="/" component={() => validateLogin("/")} />
                <Route
                  exact
                  path="/home"
                  component={() => validateLogin("/home")}
                />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/home/view/:id" component={ViewCourse} />
              </Switch>
            </div>
          </Router>
        </div>
      }
    </div>
  );
}

export default App;
