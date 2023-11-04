import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./StatisticalTracker.scss";
import { useAuth } from "../common/hooks/useAuth";
import Card from "../common/Card/Card";

function StatisticalTrackerPage() {
  //   const location = useLocation();
  //   const { isLoggedIn, login, logout } = useAuth();

  //   useEffect(() => {
  //     login({ name: "Bikram" });
  //   }, []);

  return (
    <div className="outer">
      <div className="container">
        <Card />
        <Card />
      </div>
      <div className="container">
        <Card />
        <Card />
      </div>
      <div className="container">
        <Card />
        <Card />
      </div>
      <div className="container">
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default StatisticalTrackerPage;
