import React from "react";
import { StyledCard } from "./Card.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

function Card({ header, onClick, broderColor }) {
  return (
    <StyledCard broderColor={broderColor}>
      <div className="card">
        <div className="leftBorder" />
        <div className="message">{header}</div>
        <div
          className="add"
          onClick={() => {
            onClick();
          }}
        >
          <FontAwesomeIcon icon={faCirclePlus} className="icon" />
        </div>
      </div>
    </StyledCard>
  );
}

export default Card;
