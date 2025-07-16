import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/home" className="sidebar-option">
          <img src={assets.home} alt="" className="w-[28px]"/>
          <p>Home</p>
        </NavLink>
        <NavLink to="/add" className="sidebar-option">
          <img src={assets.add_icon} alt=""/>
          <p>Add Items</p>
        </NavLink>
        <NavLink to="/category" className="sidebar-option">
          <img src={assets.add_icon} alt=""/>
          <p>Add Categories</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to="/listcategory" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>List Categories</p>
        </NavLink>
        <NavLink to="/orders" className="sidebar-option">
          <img src={assets.bell} alt="" className="w-[33px]"/>
          <p>Orders</p>
        </NavLink>
        <NavLink to="/rider" className="sidebar-option">
          <img src={assets.rider} alt="" className="w-[29px]"/>
          <p>Add Rider</p>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
