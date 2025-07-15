import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { RiderContext } from "../../context/RiderContext";
const Navbar = () => {
  const { logout } = useContext(RiderContext);
  return (
    <div className="navbar">
      <div className="nav-left ">
        <img src={assets.logo} alt="" className="logo" />
        <h1>Delivery</h1>
      </div>
      <div className="nav-right">
        <p onClick={logout}>Logout</p>
        <img src={assets.delivery_man} alt="" className="profile" />
      </div>
    </div>
  );
};

export default Navbar;
