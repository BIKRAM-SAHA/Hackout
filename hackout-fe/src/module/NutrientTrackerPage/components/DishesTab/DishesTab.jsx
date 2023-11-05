import React from "react";
import "./DishesTab.scss";

function DishesTab() {
  return (
    <div className="dishes-tab__container">
      <div className="label">Meal Type</div>
      <select id="mealType">
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
        <option value="Teatime">Teatime</option>
      </select>
    </div>
  );
}

export default DishesTab;
