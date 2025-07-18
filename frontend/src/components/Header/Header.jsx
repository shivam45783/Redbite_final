import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2 className="">Order your favourite food here</h2>

        <button
          className=""
          onClick={() => {
            document
              .getElementById("explore-menu")
              .scrollIntoView({ behavior: "smooth" });
          }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
