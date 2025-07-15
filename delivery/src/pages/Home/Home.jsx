import React, { useContext, useState } from "react";
import { RiderContext } from "../../context/RiderContext";
import "./Home.css";
import { useEffect } from "react";
import axios from "axios";
import { assets } from "../../../../frontend/src/assets/assets";
const Home = ({ url }) => {
  const {
    token,
    riderDetails,
    todayDelivered,
    weeklyDelivered,
    monthlyDelivered,
    todayOrdersDelivered,
    weeklyOrdersDelivered,
    monthlyOrdersDelivered,
    quote
  } = useContext(RiderContext);
  
 
  return (
    quote && (
      <div className="delivery_home">
        <div className="del_container flex flex-col justify-center items-center ">
          <div className="header_del">
            <img src={assets.logo_white_no_bg} alt="" className="w-[100px]" />
            <div className="quote">
              <h1>Delivery Stats</h1>
              <p>"{quote.quote}"</p>
            </div>
          </div>
          <div className="orders_home">
            <h1 className="font-[600]">Orders</h1>
            <div className="orders-grid">
              <div className="order-card">
                <p>📅Delivered Today:</p>
                <h2>{todayDelivered.length}</h2>
              </div>
              <div className="order-card">
                <p>📅Delivered This Week:</p>
                <h2>{weeklyDelivered.length}</h2>
              </div>
              <div className="order-card">
                <p>📅Delivered This Month:</p>
                <h2>{monthlyDelivered.length}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Home;
/*
<h1>Hello {riderDetails.name}</h1>
      <h2>Delivery ID: {riderDetails._id}</h2>
      <h1>Orders Delivered Today: {todayOrdersDelivered.length}</h1>
      <h1>Orders Delivered This Week: {weeklyOrdersDelivered.length}</h1>
      <h1>Orders Delivered This Month: {monthlyOrdersDelivered.length}</h1>
*/
