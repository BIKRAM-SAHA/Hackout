import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Arrow from "./dropDownArrow.svg";
import { Outer } from "./Card.styles";
function Card({ header, label1, label2=null }) {
  const [expandCard, setExpandCard] = useState(false);
  return (
    <Outer expandCard={expandCard}>
      <div className="Outer">
        <div className="card">
          <div className="leftBorder" />
          <div className="message">{header}</div>
          <div
            className="dropDown"
            onClick={() => {
              setExpandCard(!expandCard);
            }}
          >
            <img src={Arrow} height="60%" width="60%" />
          </div>
        </div>
        {expandCard && (
          <div className="expansionBox">
            <div className="input-container">
              <label className="input-label">{label1}</label>
              <input
                type="text"
                className="custom-input"
                placeholder="Enter text here"
              />
            </div>
            {label2 && (
              <div className="input-container">
                <label className="input-label">{label2}</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Enter text here"
                />
              </div>
            )}
            <button className="apply-button">Apply</button>
          </div>
        )}
      </div>
    </Outer>
  );
}

export default Card;
