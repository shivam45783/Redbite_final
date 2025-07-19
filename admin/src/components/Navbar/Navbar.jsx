import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
  const Logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="navbar">
      <div className="logo_admin ">
        <img src={assets.logo} alt="logo" className="logo" />
        <h1>Admin</h1>
      </div>
      <div className="nav-right">
        <h1 onClick={Logout}>Logout</h1>
        <img src={assets.profile_image} alt="" className="profile" />
      </div>
    </div>
  );
};

export default Navbar;
