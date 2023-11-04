import React from "react";
import "./NutrientTrackerPage.scss";

function NutrientTrackerPage() {
  return (
    <div className="nutrient-tracker__container">
      <div className="nutrient-tracker__profile">
        <img
          src={"https://randomuser.me/api/portraits/men/8.jpg"}
          alt=""
          srcset=""
          className="nutrient-tracker__profile--image"
        />
        <div className="nutrient-tracker__profile--details">
          <p>Name: </p>
          <p>Age: </p>
          <p>Weight: </p>
          <p>Height: </p>
        </div>
      </div>
      <div className="nutrient-tracker__content">CONTENT</div>
    </div>
  );
}

export default NutrientTrackerPage;
