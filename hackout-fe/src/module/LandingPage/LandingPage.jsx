import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import HeaderImage from "./Images/Header.svg";
import Card from "./components/Card/Card";
import { Flex, Footer, Header, Inner } from "./LandingPage.styles";
import ContractionTracker from "./Images/Contraction_Tracker.svg"
import MedicineTracker from "./Images/MedicineTracker.svg"
import NutrientTracker from "./Images/NutrientTracker.svg"
import StatisticalTracker from "./Images/StatisticalTracker.svg"
function LandingPage() {
  return (
    <>
      <Header>
        <img src={HeaderImage} height="100%" width="100%" />
      </Header>
      <Inner>
        <div className="innerHeader">Our Services</div>
        <Flex>
          <Card title="Contraction Tracker" description="Allows pregnant women to time their contractions during labor." logo={ContractionTracker}/>
          <Card title="Nutrient Tracker" description="Perfect meals for post and part pregnancy" logo={MedicineTracker}/>
        </Flex>
        <Flex>
          <Card title="Statistical Tracker" description="To maintain track records regarding the fetal growth , weight and baby kicks" logo={NutrientTracker}/>
          <Card title="Medical Consulatation" description="Perfect meals for post and part pregnancy  " logo={StatisticalTracker}/>
        </Flex>
      </Inner>
      {/* <Footer /> */}
    </>
  );
}

export default LandingPage;
