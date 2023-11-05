import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container } from "./Card.styles";
function LandingPage({ title, description, logo }) {
  return (
    <>
      <Container>
        <div className="imageWrapper">
          <img src={logo} />
        </div>
        <div className="title">{title}</div>
        <div className="desc">{description}</div>
      </Container>
    </>
  );
}

export default LandingPage;
