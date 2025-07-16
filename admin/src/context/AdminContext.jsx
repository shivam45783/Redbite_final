import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
export const AdminContext = React.createContext(null);

const AdminContextProvider = (props) => {
  const url = "https://redbite-final-backend.onrender.com";
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [orders, setOrders] = useState([]);
  // const location = useLocation();
  const fetchCartData = async (orderId) => {
    setCartItems(orders.find((order) => order._id === orderId).items);
    return orders.find((order) => order._id === orderId).items;
  };
  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
      // console.log(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    const storedToken = localStorage?.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchAllOrders();
    } else {
      setToken(null);
      navigate("/");
    }
  }, []);
  const contextValue = {
    fetchCartData,
    cartItems,
    orders,
    fetchAllOrders,
  };
  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
