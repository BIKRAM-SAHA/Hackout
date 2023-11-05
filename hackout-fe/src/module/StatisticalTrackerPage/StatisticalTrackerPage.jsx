import React, { useState, useContext, useEffect } from "react";
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
  const [userData, setUserData] = useState({
    weight: "",
    fetalMovement: "",
    systolic: "",
    diastolic: "",
    fetalHeartRate: "",
    afi: "",
    bloodSugar: "",
    thyroidValue: "",
    haemoglobinLevel: "",
  });

  const handleChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const sendDataToBackend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/statisticalTracker", userData);
      // Handle the response here if needed
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="outer">
      <div className="container">
        <Card header="Maternal Weight Gain" label1="Weight" onValueChange={(value) => handleChange("weight", value)}/>
        <Card header="Fetal Movement" label1="Movement" onValueChange={(value) => handleChange("fetalMovement", value)}/>
        <Card header="Blood Pressure" label1="Systolic" label2="Diastolic" onValueChange={(value) => {handleChange("systolic", value) ; handleChange("diastolic", value)}}/>
        <Card header="Fetal Heart Rate" label1="Heart Rate" onValueChange={(value) => handleChange("fetalHeartRate", value)} />
        <Card header="Amniotic Fluid Index" label1="AMI" onValueChange={(value) => handleChange("afi", value)}/>
        <Card header="Blood Sugar Levels" label1="Sugar Levels" onValueChange={(value) => handleChange("bloodSugar", value)}/>
        <Card header="Thyroid Function" label1="Value" onValueChange={(value) => handleChange("thyroidValue", value)}/>
        <Card header="Haemoglobin Levels" label1="level" onValueChange={(value) => handleChange("haemoglobinLevel", value)}/>
      </div>
    </div>
  );
}

export default StatisticalTrackerPage;
