import React, { useContext, useEffect, useRef, useState } from "react";
import "./ScrollNotify.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const ScrollNotify = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const {
    menuRef,
    showRightIndicator,
    setShowRightIndicator,
    menu,
    scrollAnchorRef,
  } = useContext(StoreContext);

  useEffect(() => {
    const updatePosition = () => {
      const el = scrollAnchorRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        setPosition({
          top: rect.top + window.scrollY + 100, // adjust offset
          left: rect.right + window.scrollX - 20, // adjust to position on right edge
        });
      }
    };

    updatePosition();
    window.addEventListener("scroll", updatePosition);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, []);

  return (
    showRightIndicator && (
      <div
        className="scroll-indicator flex items-center justify-end pr-2 text-gray-500 text-xl"
        style={{ top: position.top, left: position.left }}
      >
        <img src={assets.food} alt="" className="w-[30px]" />
        <h1>More to explore</h1>
      </div>
    )
  );
};

export default ScrollNotify;
