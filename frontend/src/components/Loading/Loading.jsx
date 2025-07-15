import React from "react";
import "./Loading.css";
import { assets } from "../../assets/assets";
const Loading = ({ show }) => {
  return (
    <div className={`spinner-box ${show ? "" : "hide-spinner"}`}>
      <img src={assets.logo_white_no_bg} alt="" />
      <p>Crave It, RedBite It!</p>
      <div className={`spinner `}></div>
    </div>
  );
};

export default Loading;
