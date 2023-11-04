import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Card.scss";
import Arrow from "./dropDownArrow.svg";
function Card({ message }) {
  return (
    <div className="card">
      <div className="leftBorder" />
      <div className="message">Gestational Age</div>
      <div className="dropDown">
        <img src={Arrow} />
      </div>
    </div>
  );
}

export default Card;
