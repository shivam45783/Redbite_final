import React, { useEffect } from "react";
import { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const {
    cartItems,
    token,
    setToken,
    userDetails,
    dataFetching,
    setDataFetching,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [showDrop, setShowDrop] = useState(false);
  const checkEmptyCart = () => {
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        return false;
      }
    }
    return true;
  };
  const emptyCartNotify = () => {
    toast("Your cart is empty", {
      icon: "🛒",
      duration: 3000,
      className: "toast",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      const profile = document.querySelector(".navbar-profile");
      if (profile && !profile.contains(e.target)) {
        setShowDrop(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-container">
      <div
        className="navbar !p-4 flex justify-between items-center gap-4 fixed top-0 left-0 right-0 z-50 "
        id="navbar"
      >
        <Link to="/home">
          <img
            src={assets.logo_white_no_bg}
            alt=""
            className="w-[70px]  logo"
          />
        </Link>
        <ul
          className="navbar-menu flex gap-5 text-gray-500 text-[12px] md:text-[15px] nav list-none 
        "
        >
          <Link
            to="/home"
            className={`{menu === "Home" ? "active" : ""},`}
            onClick={() => setMenu("Home")}
          >
            Home
          </Link>
          <a
            className={`{menu === "Menu" ? "active" : ""}`}
            onClick={() => setMenu("Menu")}
            href="#explore-menu"
          >
            Menu
          </a>
          <a
            className={`{menu === "Contact-Us" ? "active" : ""} `}
            onClick={() => setMenu("Contact-Us")}
            href="#footer"
          >
            Contact-Us
          </a>
        </ul>
        <div className="navbar-right flex items-center gap-[40px]  ">
          
          {!token ? (
            <button
              className=""
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Sign In
            </button>
          ) : (
            <>
              <h1 className="text-gray-900 text-[14px]">
                Hello, {userDetails?.name?.split(" ")[0]}
              </h1>

              <div className="navbar-profile relative w-[16px] ">
                <img
                  src={assets.profile_icon}
                  alt=""
                  onClick={() => setShowDrop((prev) => !prev)}
                  className="cursor-pointer"
                />
                <ul
                  className={`navbar-profile-dropdown absolute  ${
                    showDrop ? "show-dropdown" : "hidden-drop"
                  }`}
                >
                  <li
                    onClick={() => {
                      navigate("/myorders");
                      setShowDrop(false);
                    }}
                  >
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li
                    onClick={() => {
                      logout();
                      setShowDrop(false);
                    }}
                  >
                    <img src={assets.logout_icon} alt="" />
                    <p>Logout</p>
                  </li>
                  <hr />
                  <li
                    onClick={() => {
                      navigate("/user");

                      setShowDrop(false);
                    }}
                  >
                    <img src={assets.people} alt="" />
                    <p>Profile</p>
                  </li>
                </ul>
                <p></p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
