import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../common/hooks/useAuth";
import { Outer } from "./StressHandling.styles";
import YogaImage from "./Images/YogaImage.svg";
import Exercise from "./Images/Exercise.svg";
import Music from "./Images/Music.svg";

function StatisticalTrackerPage() {
  return (
    <Outer>
      <div className="container1">
        <Link to={"/stressHandling/1"} style={{ textDecoration: 'none' }}>
          <img src={YogaImage} height="100%" width="100%" />
          <label className="label">Yoga</label>
        </Link>
      </div>
      <div className="container2">
        <Link to={"/stressHandling/1"} style={{ textDecoration: 'none' }}>
          <img src={Exercise} height="100%" width="100%" />
          <label className="label">Music</label>
        </Link>
      </div>
      <div className="container3">
        <Link to={"/stressHandling/1"} style={{ textDecoration: 'none' }}>
          <img src={Music} height="100%" width="100%" />
          <label className="label">Exercise</label>
        </Link>
      </div>
    </Outer>
  );
}

export default StatisticalTrackerPage;
