import React from 'react'
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import "./Sidebar.css"
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to={"/home"} className={"sidebar-option"}>
          <img src={assets.home} alt="" className="home_icon" />
          <p>Home</p>
        </NavLink>
        <NavLink to={"/orders"} className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar