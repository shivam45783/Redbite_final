import React, { useContext, useEffect, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { StoreContext } from "../../context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="food-item w-full m-auto" id={`${id}`}>
      <div className="food-item-img-container relative">
        <img
          src={image}
          alt=""
          className="food-item-image w-full rounded-t-[15px]"
        />
        {!cartItems[id] ? (
          <img
            src={assets.add_icon_white}
            className="add w-[35px] absolute bottom-[15px] right-[15px] cursor-pointer rounded-[50%] "
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter absolute bottom-[15px] right-[15px] flex items-center gap-[10px] !p-[6px] rounded-[50px] bg-white">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
              className=" remove w-[30px] cursor-pointer hover:scale-[1.05]"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
              className=" add-green w-[30px] cursor-pointer hover:scale-[1.05] "
            />
          </div>
        )}
      </div>
      <div className="food-item-info !p-5 ">
        <div className="food-item-name-rating flex justify-between items-center !mb-[10px]">
          <p className="text-[20px] font-medium">{name}</p>

          <Rating
            name="half-rating-read"
            defaultValue={4}
            precision={0.5}
            readOnly
            size="small"
            className=""
          />
        </div>
        <p className="food-item-desc text-[#676767]">{description}</p>
        <p className="food-item-price text-[orangered] font-[500] !mt-[10px]">
          ₹{price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
