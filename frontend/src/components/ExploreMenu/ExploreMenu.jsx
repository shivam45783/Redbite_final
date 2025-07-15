import React, { useEffect, useState, useRef } from "react";
import "./ExploreMenu.css";
import { assets, menu_list } from "../../assets/assets";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
const ExploreMenu = ({ category, setCategory }) => {
  const { url, menu, menuRef, scrollAnchorRef } = useContext(StoreContext);

  // useEffect(() => {
  //   getCategory();
  //   // console.log(menu);
  // }, []);
  return (
    <div className="explore-menu" id="explore-menu">
      <h1 className="">Explore Menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a variety of dishes crafted with
        finest ingredients. Experience a culinary journey that will tantalize
        your taste buds and leave you craving for more.
      </p>
      <div
        className="explore-menu-list explore-menu-list-item"
        ref={(el) => {
          menuRef.current = el;
          scrollAnchorRef.current = el;
        }}
      >
        {menu.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) => (prev === item.name ? "All" : item.name))
              }
              key={index}
              className="menu-item"
            >
              <img
                src={item.url}
                alt=""
                className={`${
                  category === item.name
                    ? "border-[3px] border-[orangered] shadow-[0_4px_12px_rgba(255,69,0,0.4)] hover:shadow-[0_6px_16px_rgba(255,69,0,0.5)]"
                    : "shadow-[0_2px_6px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_10px_rgba(0,0,0,0.2)]"
                } outline-none`}
              />
              <p className="">{item.name}</p>
            </div>
          );
        })}
      </div>
      <hr className="" />
    </div>
  );
};

export default ExploreMenu;
