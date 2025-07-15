import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext.jsx";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list, url, showCart } = useContext(StoreContext);
  return (
    <div
      className="food-display"
      id="food-display"
    >
      <h2 className="">
        Top dishes near you
      </h2>
      <div className={`food-display-list ${showCart ? "overflow" : ""}`}>
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.url}
                description={item.description}
                price={item.price}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
