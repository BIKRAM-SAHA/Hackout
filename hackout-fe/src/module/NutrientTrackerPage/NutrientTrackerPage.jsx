import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import pluses from "../../assets/pluses.svg";
import "./NutrientTrackerPage.scss";
import Tab from "./components/Tab/Tab";
import FoodTab from "./components/FoodTab/FoodTab";
// import FavouritesTab from "./components/FavouritesTab/FavouritesTab";
import DishesTab from "./components/DishesTab/DishesTab";
import Card from "./components/Card/Card";
import { Modal } from "../common/Modal/Modal";
import CalenderContext from "../common/contexts/CalenderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const calculateCalorieTaken = (allFood) => {
  let sum = 0;
  const array = Object.values(allFood);
  console.log(Object.values(allFood));
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      sum += array[i][j]?.recipe?.calories;
    }
  }
  return Math.ceil(sum);
};

function NutrientTrackerPage() {
  const getTotalCalorie = () => {
    return totalCalories;
  };
  const tabs = {
    Foods: {
      label: "Foods",
      component: <FoodTab getTotalCalorie={getTotalCalorie} />,
    },
    // Favourites: { label: "Favourites", component: <FavouritesTab /> },
    Explore: { label: "Explore", component: <DishesTab /> },
  };
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(tabs.Foods.label);
  const [modalFoodType, setModalFoodType] = useState(null);
  const [addedFood, setAddedFood] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: [],
  });
  const [searchResults, setSearchResults] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const { selectedDate } = useContext(CalenderContext);
  const onSave = () => {
    setModalFoodType(null);
    setSearchText("");
    setSearchResults([]);
  };

  const fetchFoodForSelectedDate = async (selectedDate) => {
    //perform axios call and get all saved food from db
  };
  const recordAddFood = async (item) => {
    setAddedFood({
      ...addedFood,
      [modalFoodType]: [...addedFood[modalFoodType], item],
    });
  };
  const searchRecipeFromText = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BASE_URL_EDAMAM}?type=public&app_id=${
        import.meta.env.VITE_EDAMAM_APP_ID
      }&app_key=${import.meta.env.VITE_EDAMAM_APP_KEY}&q=${searchText}`,
      headers: {
        "Edamam-Account-User": `${import.meta.env.VITE_EDAMAM_USER_ID}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setSearchResults(response.data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchFoodForSelectedDate(selectedDate);
  }, [selectedDate]);
  useEffect(() => {
    setTotalCalories(calculateCalorieTaken(addedFood));
  }, [addedFood]);

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
          <Tab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            totalCalories={totalCalories}
          />
        </div>
        <div className="food">
          <Card
            header={"Breakfast"}
            label1={"Breakfast"}
            broderColor={"#E91E63"}
            onClick={() => setModalFoodType("breakfast")}
          />
          <Card
            header={"Lunch"}
            label1={"Lunch"}
            broderColor={"#F48FB1"}
            onClick={() => setModalFoodType("lunch")}
          />
          <Card
            header={"Dinner"}
            label1={"Dinner"}
            broderColor={"#12E5B0"}
            onClick={() => setModalFoodType("dinner")}
          />
          <Card
            header={"Snacks"}
            label1={"Snacks"}
            broderColor={"#B575E7"}
            onClick={() => setModalFoodType("snacks")}
          />
        </div>
      </div>
      <Modal isOpen={modalFoodType !== null}>
        <div className="nutrient-tracker__modal">
          <div className="modal__content">
            <div className="title">{modalFoodType?.toUpperCase()}</div>
            <div className="added-food">
              {addedFood[modalFoodType]?.map((foodItem) => (
                <div>{foodItem.recipe?.label}</div>
              ))}
            </div>
            <div className="search-food">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button onClick={() => searchRecipeFromText()}>Search</button>
              <div className="search-results">
                {searchResults.map((item) => (
                  <div className="recipe">
                    <div className="label">{item.recipe?.label}</div>
                    <div className="calories">
                      {Math.ceil(item.recipe?.calories || 0)}kcal
                    </div>
                    <img src={item.recipe?.images?.THUMBNAIL?.url} alt="" />
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      className="icon"
                      onClick={() => recordAddFood(item)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button className="save" onClick={onSave}>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default NutrientTrackerPage;
