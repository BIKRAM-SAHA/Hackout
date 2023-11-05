import React, { useRef, useState } from "react";
import axios from "axios";
import "./DishesTab.scss";

function DishesTab() {
  const mealTypeRef = useRef();
  const [searchResults, setSearchResults] = useState([]);

  console.log(mealTypeRef.current?.value);
  const searchRecipe = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASE_URL_EDAMAM}?type=public&app_id=${
        import.meta.env.VITE_EDAMAM_APP_ID
      }&app_key=${import.meta.env.VITE_EDAMAM_APP_KEY}&mealType=${
        mealTypeRef?.current.value || "breakfast"
      }`,
      headers: {
        "Edamam-Account-User": `${import.meta.env.VITE_EDAMAM_USER_ID}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.hits));
        setSearchResults(response.data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(mealTypeRef?.current.value || "breakfast");
  };
  return (
    <div className="dishes-tab__container">
      <div className="query">
        <div className="label">Meal Type</div>
        <select id="mealType" ref={mealTypeRef}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Teatime">Teatime</option>
        </select>
        <button onClick={searchRecipe}>Search</button>
      </div>
      <div className="results">
        {searchResults.map((item) => (
          <div className="recipe">
            <div className="label">{item.recipe?.label}</div>
            <div className="calories">
              {Math.ceil(item.recipe?.calories || 0)}kcal
            </div>
            <img src={item.recipe?.images?.THUMBNAIL?.url} alt="" />
            <p>
              <a href={item.recipe?.url} target="_blank">
                Recipe
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DishesTab;
