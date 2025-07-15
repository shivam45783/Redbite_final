import React, { useContext, useEffect, useState, useRef } from "react";
import "./Orders.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { RiderContext } from "../../context/RiderContext";
import { assets } from "../../assets/assets";
import { data } from "react-router-dom";

const Orders = ({ url }) => {
  const {
    orders,
    cartItems,
    food_list,
    fetchCartData,
    getTotalCartAmount,
    fetchAllOrders,
    riderDetails,
  } = useContext(RiderContext);
  const [showCart, setShowCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [outDelivery, setOutDelivery] = useState(false);
  const [otpMap, setOtpMap] = useState({});

  const popupRef = useRef(null);
  const handleClose = () => {
    setShowCart(false);
  };
  const statusHandler = async (orderId, status) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status,
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  const changeStatus = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: "Out For Delivery",
    });
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  const setRider = async (riderId, orderId) => {
    const response = await axios.post(`${url}/api/rider/set`, {
      riderId,
      orderId,
    });
    console.log(response.message);

    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  const deliveryChargeCalculator = async (cartItems, amount) => {
    const subTotal = await cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryCharge = amount - subTotal;
    setDeliveryCharge(deliveryCharge);
  };
  const authOTP = async (orderId, OTP) => {
    if (OTP.length != 4) {
      toast.error("Please enter a 4 digit OTP");
      return;
    }
    const response = await axios.post(`${url}/api/order/auth`, {
      orderId,
      OTP,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    } else {
      setOtpMap((prev) => ({ ...prev, [orderId]: false }));
      if (response.data.message === "Invalid OTP") {
        toast.error("Invalid OTP");

        return;
      } else if (response.data.message === "Order not found") {
        toast.error("Order not found");
        return;
      } else {
        toast.error("Error in verifying OTP");
      }
    }
  };
  useEffect(() => {
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
  return (
    <div className="orders-box">
      <div className="orders">
        <h1>Orders</h1>
        <div className="orders-container">
          {orders.map((order) => {
            return (
              <div
                className={`order-item ${
                  order.status === "Food Processing"
                    ? "processing"
                    : order.status === "Out for Delivery"
                    ? ""
                    : order.status === "Delivered"
                    ? "delivered"
                    : order.status === "Not Accepted"
                    ? "notaccepted"
                    : ""
                }`}
              >
                <div className="order-item-row">
                  <div className="order-item-col order-data">
                    <p className="order-heading">Order Id:</p>
                    <p>{order._id}</p>
                  </div>
                  <div className="order-item-name order-data">
                    <p className="order-heading">Customer Name:</p>
                    <p>
                      {order.address.firstName} {order.address.lastName}
                    </p>
                  </div>

                  <div className="order-item-col order-data">
                    <p className="order-heading">Order Amount:</p>
                    <p>{order.amount}</p>
                  </div>
                  <div className="order-item-modify order-data">
                    <button
                      className="cart-btn"
                      onClick={async () => {
                        const cart = await fetchCartData(order._id);
                        await deliveryChargeCalculator(cart, order.amount);
                        setAmount(order.amount);
                        setShowCart(true);
                      }}
                    >
                      Cart
                    </button>
                    {!order.deliveryRider && (
                      <button
                        onClick={() => {
                          statusHandler(order._id, "Food Processing");
                          setRider(riderDetails._id, order._id);
                        }}
                        className="accept-btn"
                      >
                        Accept
                      </button>
                    )}
                    {order.deliveryRider &&
                      order.status != "Out For Delivery" &&
                      order.status != "Delivered" && (
                        <button
                          onClick={() => {
                            statusHandler(order._id, "Out For Delivery");
                            setOutDelivery(true);
                          }}
                          className="accept-btn"
                        >
                          Out For Delivery
                        </button>
                      )}
                    {/* {order.status == "Delivered" && (
                        <div className="crossimg">
                          <img src={assets.close} alt="" className="w-[18px]"/>
                        </div>
                      )} */}
                    {order.status == "Delivered" && <p>Delivered</p>}
                    {order.status == "Out For Delivery" && (
                      <div className="delivery-otp">
                        <input
                          type="text"
                          placeholder="OTP"
                          value={otpMap[order._id] || ""}
                          onChange={(e) =>
                            setOtpMap((prev) => ({
                              ...prev,
                              [order._id]: e.target.value,
                            }))
                          }
                        />
                        <button
                          onClick={() => authOTP(order._id, otpMap[order._id])}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="cart-popup-container">
        {showCart && (
          <div ref={popupRef} className="cart-items-popup">
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
              {cartItems.map((item, index) => {
                return (
                  <div className="food-popup-box">
                    <div key={index} className="food-popup-item ">
                      <div className="popup-item-image">
                        <img src={`${item.url}`} alt="" />
                      </div>
                      <div className="popup-item-details">
                        <div className="item-name">
                          <h1 className="font-[600]">{item.name}</h1>
                        </div>
                        <div className="item-quantity">
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <div className="item-price">
                          <p>₹{item.price}</p>
                        </div>
                      </div>
                    </div>
                    <div className="item-details">
                      <p>Total: ₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="cart-popup-footer">
              <div className="cart-popup-details">
                <p>
                  <span className="font-[600]">Delivery Charge</span>: ₹
                  {deliveryCharge}
                </p>
                <p>
                  <span className="font-[600]">Total</span>: ₹{amount}
                </p>
                <p></p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

/*



*/
