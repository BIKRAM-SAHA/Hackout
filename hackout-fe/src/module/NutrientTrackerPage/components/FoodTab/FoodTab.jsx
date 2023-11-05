import React from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./FoodTab.scss";

function FoodTab({ getTotalCalorie }) {
  const totalCalorie = getTotalCalorie();
  const value = totalCalorie;
  const max = 1800;
  //   About 1,800 calories per day during the first trimester
  // About 2,200 calories per day during the second trimester
  // About 2,400 calories per day during the third trimester
  return (
    <div className="food-tab">
      <CircularProgressbarWithChildren
        value={value}
        maxValue={max}
        className="circular-calorie-bar"
      >
        <div className="val">{`${value}/${max}`}</div>
        <div className="unit">kcal available</div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default FoodTab;
