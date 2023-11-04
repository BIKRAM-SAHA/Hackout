import React, { useState } from "react";
import pluses from "../../assets/pluses.svg";
import "./NutrientTrackerPage.scss";
import Tab from "./components/Tab/Tab";
import FoodTab from "./components/FoodTab/FoodTab";
import FavouritesTab from "./components/FavouritesTab/FavouritesTab";
import DishesTab from "./components/DishesTab/DishesTab";

const tabs = {
  Foods: { label: "Foods", component: <FoodTab /> },
  Favourites: { label: "Favourites", component: <FavouritesTab /> },
  Dishes: { label: "Dishes", component: <DishesTab /> },
};

function NutrientTrackerPage() {
  const [activeTab, setActiveTab] = useState(tabs.Foods.label);
  return (
    <div className="nutrient-tracker__container">
      <div className="nutrient-tracker__profile">
        <img src={pluses} alt="" className="nutrient-tracker__profile--icon" />
        <img
          src={"https://randomuser.me/api/portraits/men/8.jpg"}
          alt=""
          className="nutrient-tracker__profile--image"
        />
        <div className="nutrient-tracker__profile--details">
          <p>Name: {"Bikram Saha"}</p>
          <p>Age: {20}</p>
          <p>Weight: {80} kg</p>
          <p>Height: {5.7} ft</p>
        </div>
      </div>
      <div className="nutrient-tracker__content">
        <div>
          <Tab activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default NutrientTrackerPage;
