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
        <Card header="Maternal Weight Gain" label1="Weight" />
        <Card header="Fetal Movement" label1="Movement" />
        <Card header="Blood Pressure" label1="Systolic" label2="Diastolic" />
        <Card header="Fetal Heart Rate" label1="Heart Rate" />
        <Card header="Amniotic Fluid Index" label1="AMI" />
        <Card header="Blood Sugar Levels" label1="Sugar Levels" />
        <Card header="Thyroid Function" label1="Value" />
        <Card header="Haemoglobin Levels" label1="level" />
      </div>
    </div>
  );
}

export default StatisticalTrackerPage;
