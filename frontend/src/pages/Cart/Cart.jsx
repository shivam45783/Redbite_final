import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    deliveryCharges,
    url,
  } = useContext(StoreContext);
  const navigate = useNavigate();

  const navigateFood = (id) => {
    navigate(`/home#${id}`);
  };
  
  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      navigate("/home");
    }
  }, [cartItems]);
  return (
    <div className="cart mt-[100px]">
      <div className="cart-items">
        <div className="cart-items-title font-bold">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />

        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item !mt-[10px] !mb-[10px] text-black font-semibold">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt=""
                    className="w-[50px]"
                    onClick={() => navigateFood(item._id)}
                  />

                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <button
                    onClick={() => {
                      removeFromCart(item._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom !mt-[80px] flex justify-between gap-[max(12vw,20px)]">
        <div className="cart-total flex flex-col gap-[20px] flex-1">
          <h2 className="font-semibold">Cart Total:</h2>
          <p>Delivery charge free above ₹500</p>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>
                ₹
                {getTotalCartAmount() > 500
                  ? 0
                  : getTotalCartAmount() > 0
                  ? deliveryCharges
                  : 0}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() > 500
                  ? getTotalCartAmount()
                  : getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharges}
              </b>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/order");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="cart-promocode flex-1 ">
          <div>
            <p className="text-gray-500">
              If you have a promocode, enter it here
            </p>
            <div className="cart-promocode-input !mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[4px]  hover:bg-gray-200">
              <input
                type="text"
                placeholder="Promocode"
                className="bg-transparent border-none outline-none !px-[10px]"
              />
              <button className="w-[max(10vw,150px)] !py-[12px] !px-[5px] bg-black text-white rounded-[4px] cursor-pointer hover:bg-gray-700 ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
