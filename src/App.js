import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navigation from "./components/shared/Navigation";
import GuestNav from "./components/shared/GuestNav";
import HomePage from "./components/HomePage";
import ViewCourse from "./components/ViewCourse";
import Register from "./components/user/Register";
import Login from "./components/user/Login";

function App() {
  let [loggedNavStatus, setLoggedNavStatus] = useState("user");

  useEffect(() => {
    if (window.location.href.match(/login.*/)) {
      setLoggedNavStatus("guest");
    } else if (window.location.href.match(/register.*/)) {
      setLoggedNavStatus("guest");
    }
  }, []);

  const validateLogin = (component) => {
    if (component === "/") {
      setLoggedNavStatus("guest");
      return <HomePage />;
    } else if (localStorage.getItem("user-role") === "user") {
      setLoggedNavStatus("user");
      return <HomePage />;
    }
    // else {
    //   alert("No user logged in yet.!");
    // }
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
                {/* <Route path="/mypackages" component= {MyPackages} />
                  <Route path="/package/upload" component= {RegPackage} /> */}
              </Switch>
            </div>
          </Router>
          {/* <div>
              <FooterHandler/>
            </div> */}
        </div>
      }
    </div>
  );
}

export default App;
