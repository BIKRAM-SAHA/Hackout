import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./StatisticalTracker.scss";
import { useAuth } from "../common/hooks/useAuth";
import axios from "axios";
import Card from "../common/Card/Card";
import CalenderContext from "../common/contexts/CalenderContext";

function StatisticalTrackerPage() {
  const { selectedDate } = useContext(CalenderContext);
  useEffect(() => {
    sendDataToBackend(selectedDate);
  }, [selectedDate]);
  //   const location = useLocation();
  //   const { isLoggedIn, login, logout } = useAuth();

  //   useEffect(() => {
  //     login({ name: "Bikram" });
  //   }, []);
  const [userData, setUserData] = useState({
    maternal_weight: "",
    fetal_movement: "",
    blood_pressure_sys: "",
    blood_pressure_dias: "",
    fetal_heart_rate: "",
    amniotic_fluid_index: "",
    blood_sugar_level: "",
    thyroid_function: "",
    haemoglobin_level: "",
  });

  const handleChange = (field, value) => {
    setUserData((prevData) => ({ ...prevData, [field]: value }));
  };

  const sendDataToBackend = async (selectedDate) => {
    try {
      handleChange("date",selectedDate)
      const response = await axios.post("http://localhost:3000/statisticalTracker", userData);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="outer">
      <div className="container">
        <Card header="Maternal Weight Gain" label1="Weight" onValueChange={(value) => handleChange("maternal_weight", value)} sendDataToBackend={sendDataToBackend}/>
        <Card header="Fetal Movement" label1="Movement" onValueChange={(value) => handleChange("fetal_movement", value)} sendDataToBackend={sendDataToBackend}/>
        <Card header="Blood Pressure" label1="Systolic" label2="Diastolic" onValueChange={(value) => {handleChange("blood_pressure_sys", value) ; handleChange("blood_pressure_dias", value)}} sendDataToBackend={sendDataToBackend}/>
        <Card header="Fetal Heart Rate" label1="Heart Rate" onValueChange={(value) => handleChange("fetal_heart_rate", value)} sendDataToBackend={sendDataToBackend} />
        <Card header="Amniotic Fluid Index" label1="AMI" onValueChange={(value) => handleChange("amniotic_fluid_index", value)} sendDataToBackend={sendDataToBackend}/>
        <Card header="Blood Sugar Levels" label1="Sugar Levels" onValueChange={(value) => handleChange("blood_sugar_level", value)} sendDataToBackend={sendDataToBackend}/>
        <Card header="Thyroid Function" label1="Value" onValueChange={(value) => handleChange("thyroid_function", value)} sendDataToBackend={sendDataToBackend}/>
        <Card header="Haemoglobin Levels" label1="level" onValueChange={(value) => handleChange("haemoglobin_level", value)} sendDataToBackend={sendDataToBackend}/>
      </div>
    </div>
  );
}

export default StatisticalTrackerPage;
