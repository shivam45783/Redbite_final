import React, { useContext, useEffect, useState, useRef } from "react";
import "./Orders.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import DownloadButton from "../../components/DownloadBtn/DownloadBtn";
const Orders = ({ url }) => {
  const [showCart, setShowCart] = useState(false);
  const [amount, setAmount] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const { fetchCartData, cartItems, orders, fetchAllOrders } =
    useContext(AdminContext);
  const popupRef = useRef(null);
  const handleClose = () => {
    setShowCart(false);
  };
  const deliveryChargeCalculator = async (cartItems, amount) => {
    const subTotal = await cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const deliveryCharge = amount - subTotal;
    setDeliveryCharge(deliveryCharge);
  };

  const removeOrder = async (orderId) => {
    const response = await axios.post(`${url}/api/order/remove`, { orderId });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
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
    <>
      <div className="order">
        <div className="order-list">
          <h1>Orders</h1>
          {orders.map((order, index) => (
            <div
              key={index}
              className={`${
                order.status === "Delivered"
                  ? "order-item-delivered"
                  : "order-item-not-delivered"
              } order-item`}
            >
              <img src={assets.stir_fry} alt="" />
              <div className="order-item-info">
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
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.street + ", "}</p>
                  <p>
                    {order.address.city +
                      ", " +
                      order.address.state +
                      ", " +
                      order.address.country +
                      ", " +
                      order.address.zipCode}
                  </p>
                </div>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹{order.amount}</p>
              <p className="font-[600]">{order.status}</p>
              <button
                className={`${
                  order.status === "Delivered" ? "" : "button-hide"
                } remove-btn`}
                onClick={(event) => {
                  removeOrder(order._id);
                }}
              >
                Remove
              </button>
              <DownloadButton order={order} />
            </div>
          ))}
        </div>
        {orders.length === 0 && (
          <div className="no_orders">
            <img src={assets.empty} alt="" />
            <h1>No Orders Found</h1>
          </div>
        )}
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
                    <div className="item-details ">
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
    </>
  );
};

export default Orders;
