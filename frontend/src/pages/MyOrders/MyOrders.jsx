import React from "react";
import "./MyOrders.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";
import Loading from "../../components/Loading/Loading";

const MyOrders = () => {
  const { url, token, loading, setLoading } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await axios.post(
      `${url}/api/order/userorders`,
      {},
      {
        headers: { token },
      }
    );
    setData(response.data.data.reverse());
    setLoading(false);
    // console.log(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <>
      {data.length && (
        <div className="my-orders">
          <h1 className="order-heading">My Orders</h1>
          <div className="myorder-container">
            {data.map((order, index) => {
              return (
                <div
                  key={index}
                  className={`my-orders-order ${
                    order.status === "Food Processing"
                      ? "processing"
                      : order.status === "Out for Delivery"
                      ? "delivery"
                      : order.status === "Delivered"
                      ? "delivered"
                      : order.status === "Not Accepted"
                      ? "notaccepted"
                      : ""
                  }`}
                >
                  <img src={assets.parcel_icon} alt="" className="w-[50px]" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x" + item.quantity;
                      } else {
                        return item.name + " x" + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p>₹{order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p>
                    <span className="text-[#FF4500]">&#x25cf;</span>
                    <b className="text-[#454545] font-[500]">{order.status}</b>
                  </p>

                  <p>
                    {order.otp ? (
                      <span className="font-[600]">OTP : {order.otp}</span>
                    ) : (
                      ""
                    )}
                  </p>
                  {order.deliveryRider && (
                    <button
                      onClick={() => navigate(`/chat/${order.deliveryRider}`)}
                    >
                      Chat
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {data.length == 0 && (
        <div className="no-order-container" id="no-order-container">
          <h1>No Orders Found🛒</h1>
          <p>You have not placed any orders</p>
          <p className="dishes">
            Explore the diverse range of dishes which will not only satisfy your
            cravings but also leave you craving for more
          </p>
        </div>
      )}
    </>
  );
};

export default MyOrders;
