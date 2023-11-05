import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Arrow from "./dropDownArrow.svg";
import { Outer } from "./Card.styles";
function Card({ header, label1, label2=null , onValueChange=null, sendDataToBackend=null}) {
  const [expandCard, setExpandCard] = useState(false);
  const [field1Value, setField1Value] = useState("");
  const [field2Value, setField2Value] = useState("");

  const handleField1Change = (e) => {
    const newValue = e.target.value;
    setField1Value(newValue);
    onValueChange(newValue);
  };

  const handleField2Change = (e) => {
    const newValue = e.target.value;
    setField2Value(newValue);
    onValueChange(newValue);
  };
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
          value={field1Value}
          onChange={handleField1Change}
        />
      </div>
            {label2 && (
              <div className="input-container">
                <label className="input-label">{label2}</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Enter text here"
                  value={field2Value}
                  onChange={handleField2Change}
                />
              </div>
            )}
            <button className="apply-button" onClick={sendDataToBackend}>Apply</button>
          </div>
        )}
      </div>
    </Outer>
  );
}

export default Card;
