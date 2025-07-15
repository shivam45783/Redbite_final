import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo_admin ">
        <img src={assets.logo} alt="logo" className="logo" />
        <h1>Admin</h1>
      </div>

      <img src={assets.profile_image} alt="" className="profile" />
    </div>
  );
};

export default Navbar;
