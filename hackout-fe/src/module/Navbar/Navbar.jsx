import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useAuth } from "../common/hooks/useAuth";

function Navbar() {
  const location = useLocation();
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    login({ name: "Bikram" });
  }, []);
  
  return (
    <div className="navbar">
      <div className="logo">बधाई</div>
      <ul className="routes">
        {isLoggedIn ? (
          <>
            <li>
              <Link
                to={"/statisticalTracker"}
                className={`links ${
                  location.pathname === "/statisticalTracker" ? "active" : ""
                }`}
              >
                Statistical Tracker
              </Link>
            </li>
            {/* <li>
              <Link
                to={"/contractionTracker"}
                className={`links ${
                  location.pathname === "/contractionTracker" ? "active" : ""
                }`}
              >
                Contraction Tracker
              </Link>
            </li> */}
            {/* <li>
              <Link
                to={"/medicineTracker"}
                className={`links ${
                  location.pathname === "/medicineTracker" ? "active" : ""
                }`}
              >
                Medicine Tracker
              </Link>
            </li> */}
            <li>
              <Link
                to={"/nutrientTracker"}
                className={`links ${
                  location.pathname === "/nutrientTracker" ? "active" : ""
                }`}
              >
                Nutrient Tracker
              </Link>
            </li>
            <li>
              <Link
                to={"/stressHandling"}
                className={`links ${
                  location.pathname === "/stressHandling" ? "active" : ""
                }`}
              >
                Stress Handling
              </Link>
            </li>
            <li>
              <button className="btn-primary" onClick={logout}>
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">
                <button className="btn-primary">Log In</button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="btn-primary">Sign Up</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
