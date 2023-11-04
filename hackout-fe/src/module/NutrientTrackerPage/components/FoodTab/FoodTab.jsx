import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function FoodTab() {
  const value = 1100;
  const max = 1800;
  //   About 1,800 calories per day during the first trimester
  // About 2,200 calories per day during the second trimester
  // About 2,400 calories per day during the third trimester
  return (
    <div>
      <CircularProgressbar
        value={value}
        maxValue={max}
        text={`${value}`}
        strokeWidth={5}
        background={"#EC407A"}
      />
    </div>
  );
}

export default FoodTab;
