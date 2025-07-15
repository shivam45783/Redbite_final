import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
const Home = ({ url }) => {
  const [todayOrders, setTodayOrders] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [weeklyRevenue, setWeeklyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [quote, setQuote] = useState([]);
  const getTodayOrders = async () => {
    const response = await axios.get(`${url}/api/order/today`);
    if (response.data.success) {
      setTodayOrders(response.data.data);
      // console.log(response.data.data);
      computeTodayRevenue(response.data.data);
    } else {
      // console.log(response.data.message);

      toast.error(response.data.message);
    }
  };
  const getWeeklyOrders = async () => {
    const response = await axios.get(`${url}/api/order/weekly`);
    if (response.data.success) {
      setWeeklyOrders(response.data.data);
      // console.log(response.data.data);
      computeWeeklyRevenue(response.data.data);
    } else {
      // console.log(response.data.message);

      toast.error(response.data.message);
    }
  };
  const getMonthlyOrders = async () => {
    const response = await axios.get(`${url}/api/order/monthly`);
    if (response.data.success) {
      setMonthlyOrders(response.data.data);
      // console.log(response.data.data);
      computeMonthlyRevenue(response.data.data);

    } else {
      // console.log(response.data.message);

      toast.error(response.data.message);
    }
  };
  const getQuote = async () => {
    const response = await axios.get(`${url}/api/quote/get`);
    if (response) {
      setQuote(response.data[0]);
      // console.log(response.data);
    }
  };
  const computeTodayRevenue = (todayOrders)=>{
    const revenue = todayOrders.reduce((total, order) => {
      return total + order.amount;
    }, 0)

    setTodayRevenue(revenue);
  }
  const computeWeeklyRevenue = (weeklyOrders)=>{
    const revenue = weeklyOrders.reduce((total, order) => {
      return total + order.amount;
    },0)

    setWeeklyRevenue(revenue);
  }
  const computeMonthlyRevenue = (monthlyOrders)=>{
    const revenue = monthlyOrders.reduce((total, order) => {
      return total + order.amount;
    },0)
    // console.log(revenue);
    
    setMonthlyRevenue(revenue);
  }
  useEffect(() => {
    // getQuote();
    getTodayOrders();
    getWeeklyOrders();
    getMonthlyOrders();
  
  }, []);
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-logo">
          <img src={assets.RedBite_white} alt="" />
        </div>
        <div className="heading">
          <h1>RedBite Stats</h1>
          <p>{quote?.quote}</p>
        </div>
        <div className="orders">
          <div className="stats">
            <div className="today-stats stats-card">
              <p>Today's Orders</p>
              <h1>{todayOrders.length}</h1>
            </div>
            <div className="weekly-stats stats-card">
              <p>This Week's Orders</p>
              <h1>{weeklyOrders.length}</h1>
            </div>
            <div className="monthy-stats stats-card">
              <p>This Month's Orders</p>
              <h1>{monthlyOrders.length}</h1>
            </div>
          </div>
        </div>
        <div className="revenue">
          <div className="heading">
            <h1>Revenue</h1>
          </div>
          <div className="stats">
            <div className="today-stats stats-card">
              <p>Today's Revenue</p>
              <h1>{todayRevenue}</h1>
            </div>
            <div className="weekly-stats stats-card">
              <p>This Week's Revenue</p>
              <h1>{weeklyRevenue}</h1>
            </div>
            <div className="monthy-stats stats-card">
              <p>This Month's Revenue</p>
              <h1>{monthlyRevenue}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
