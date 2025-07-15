import React, { useContext, useState, useRef, useEffect } from "react";
import "./CartPop.css";
import { assets, food_list } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
const CartPop = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    deliveryCharges,
    url,
    showCart,
    setShowCart,
    cartActivate,
  } = useContext(StoreContext);
  const navigate = useNavigate();
  const popupRef = useRef(null);
  const handleClose = () => {
    setShowCart(false);
  };

  useEffect(() => {
    // if (!showCart) return;
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      setShowCart(false);
    }
  }, [cartItems]);
  useEffect(() => {
    if (showCart) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [showCart]);

  return (
    <div className="cart-popup-container">
      <div
        className={`${
          Object.keys(cartItems).length > 0 ? "" : "hide"
        } cartpop-up ${showCart ? "hide-cart-popup" : ""}`}
      >
        <img
          src={assets.shopping_cart}
          alt=""
          className="cart-image"
          onClick={() => setShowCart((prev) => !prev)}
        />
      </div>
      {showCart && (
        <div ref={popupRef} className={`cart-items-popup `}>
          <div className="cart-popup-header">
            <img
              src={assets.left_arrow}
              alt=""
              className=""
              onClick={() => setShowCart(false)}
            />
            <h1 className="font-[600]">Cart</h1>
          </div>
          <hr />
          <div className="cart-popup-items">
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div className="food-popup-box ">
                    <div key={index} className="food-popup-item ">
                      <div className="popup-item-image">
                        <img
                          src={`${item.url}`}
                          alt=""
                          className=""
                        />
                      </div>
                      <div className="popup-item-details">
                        <div className="item-name">
                          <h1 className="font-[600]">{item.name}</h1>
                        </div>
                        <div className="item-quantity">
                          <p>Quantity: {cartItems[item._id]}</p>
                        </div>
                        <div className="item-price">
                          <p className="">₹{item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-details flex items-center justify-between !mt-[5px]">
                      <p className="">
                        Total: ₹{item.price * cartItems[item._id]}
                      </p>
                      <button
                        onClick={() => {
                          removeFromCart(item._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="cart-popup-footer">
            <div className="cart-popup-details">
              <p className="text-[12px]">*Free delivery on orders above ₹500</p>
              <p>
                {" "}
                <span className="font-[600]">SubTotal</span>: ₹
                {getTotalCartAmount()}
              </p>
              <p></p>
            </div>
            <div className="cart-popup-details">
              <p>
                {" "}
                <span className="font-[600]">Delivery Charges</span>: ₹
                {getTotalCartAmount() > 500
                  ? 0
                  : getTotalCartAmount() > 0
                  ? deliveryCharges
                  : 0}
              </p>
              <p></p>
            </div>
            <div className="cart-popup-details">
              <p>
                <span className="font-[600]">Total</span>: ₹
                {getTotalCartAmount() > 500
                  ? getTotalCartAmount()
                  : getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharges}
              </p>
              <p></p>
            </div>
            {!window.location.href.includes("order") && (
              <>
                <button
                  onClick={() => {
                    navigate("/order");
                    setShowCart(false);
                    scroll(0, 0);
                  }}
                  className="checkout-button"
                >
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPop;
