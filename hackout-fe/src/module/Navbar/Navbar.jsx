import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const location = useLocation();
  return (
    <div className="navbar">
      <div className="logo">LOGO</div>
      <ul className="routes">
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
        <li>
          <Link
            to={"/contractionTracker"}
            className={`links ${
              location.pathname === "/contractionTracker" ? "active" : ""
            }`}
          >
            Contraction Tracker
          </Link>
        </li>
        <li>
          <Link
            to={"/medicineTracker"}
            className={`links ${
              location.pathname === "/medicineTracker" ? "active" : ""
            }`}
          >
            Medicine Tracker
          </Link>
        </li>
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
      </ul>
    </div>
  );
}

export default Navbar;
