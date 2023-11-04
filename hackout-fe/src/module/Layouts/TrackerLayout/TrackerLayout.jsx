import React from "react";
import Calender from "./components/Calender";
import pregnantLady from "../../../assets/pregnant-lady-illustration.svg";
import "./TrackerLayout.scss";

function TrackerLayout({ children }) {
  return (
    <div className="trackerLayout">
      <div className="trackerLayout__content">{children}</div>
      <div className="trackerLayout__calender-container">
        <div className="trackerLayout__relative">
          <div className="trackerLayout__fixed">
            <Calender />
            <img
              src={pregnantLady}
              alt=""
              className="trackerLayout__illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackerLayout;
