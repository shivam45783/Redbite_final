import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export const RiderContext = React.createContext(null);

const RiderContextProvider = ({ children }) => {
  const url = "https://redbite-final-backend.onrender.com";
  const [riderDetails, setRiderDetails] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [orders, setOrders] = useState([]);
  const [food_list, setFoodlist] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const location = useLocation();
  const [todayDelivered, setTodayDelivered] = useState([]);
  const [weeklyDelivered, setWeeklyDelivered] = useState([]);
  const [monthlyDelivered, setMonthlyDelivered] = useState([]);
  const [quote, setQuote] = useState(null);
  const todayOrdersDelivered = async (token) => {
    const response = await axios.post(`${url}/api/order/today/${token}`);
    if (response.data.success) {
      setTodayDelivered(response.data.data);
      // console.log(response.data.data);
    } else {
      // console.log(response.data.message);
    }
  };
  const weeklyOrdersDelivered = async (token) => {
    const response = await axios.post(`${url}/api/order/weekly/${token}`);
    if (response.data.success) {
      setWeeklyDelivered(response.data.data);
      // console.log(response.data.data);
    } else {
      // console.log(response.data.message);
    }
  };
  const monthlyOrdersDelivered = async (token) => {
    const response = await axios.post(`${url}/api/order/monthly/${token}`);
    if (response.data.success) {
      setMonthlyDelivered(response.data.data);
      // console.log(response.data.data);
    } else {
      // console.log(response.data.message);
    }
  };
  const getRiderDetails = async (token) => {
    try {
      const response = await axios.get(`${url}/api/rider/get/${token}`);
      if (response.data.rider) {
        setRiderDetails(response.data.rider);
        // console.log(response.data.rider);
      }
    } catch (error) {
      if (error.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token expired, please login again");
      }
    }
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
  const fetchCartData = async (orderId) => {
    setCartItems(orders.find((order) => order._id === orderId).items);
    return orders.find((order) => order._id === orderId).items;
  };
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setFoodlist(response.data.data);
        // console.log(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  const getQuote = async () => {
    const response = await axios.get(`${url}/api/quote/get`);
    if (response) {
      setQuote(response.data[0]);
      console.log(response.data);
    }
  };
  useEffect(() => {
    const storedToken = localStorage?.getItem("token");

    if (storedToken) {
      getRiderDetails(storedToken);
      setToken(storedToken);
      fetchAllOrders();
      todayOrdersDelivered(storedToken);
      weeklyOrdersDelivered(storedToken);
      monthlyOrdersDelivered(storedToken);
      getQuote();
      // console.log(riderDetails);

      if (location.pathname === "/") {
        navigate("/home");
      }
    } else {
      navigate("/");
    }
    fetchFoodList();
  }, []);
  const contextValue = {
    token,
    setToken,
    url,
    riderDetails,
    orders,
    food_list,
    cartItems,
    setCartItems,
    fetchCartData,
    getTotalCartAmount,
    fetchAllOrders,
    todayDelivered,
    weeklyDelivered,
    monthlyDelivered,
    todayOrdersDelivered,
    weeklyOrdersDelivered,
    monthlyOrdersDelivered,
    logout,
    quote,
  };

  return (
    <RiderContext.Provider value={contextValue}>
      {children}
    </RiderContext.Provider>
  );
};
export default RiderContextProvider;
