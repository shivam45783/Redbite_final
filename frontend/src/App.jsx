import React, { useEffect, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Login from "./pages/Login/Login";
import OTP from "./pages/OTP/OTP";
import { Toaster } from "react-hot-toast";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Or any theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import UserDetails from "./components/UserDetails/UserDetails";
import MyOrders from "./pages/MyOrders/MyOrders";
import AuthEmail from "./pages/AuthEmail/AuthEmail";
import CartPop from "./components/CartPop/CartPop";
import ForgotPass from "./pages/ForgotPass/ForgotPass";
import Loading from "./components/Loading/Loading";
import { StoreContext } from "./context/StoreContext";
// import ChatHome from "./pages/ChatHome/ChatHome";
const BodyClassController = () => {
  const location = useLocation();

  useEffect(() => {
    document.body.className = "";
    document.getElementsByClassName("app")[0].classList.add("widthInApp");
    if (location.pathname === "/") {
      document.body.classList.add("login-page");
    }
    if (location.pathname.startsWith("/otp/")) {
      document.body.classList.add("login-page");
    }
    if (location.pathname === "/user") {
      document.body.classList.add("user-page");
      document.getElementById("navbar").classList.add("user-navbar");
    }
    if (location.pathname === "/home") {
      document.getElementById("navbar").classList.remove("user-navbar");
    }
    if (location.pathname === "/myorders") {
      document.body.classList.add("no-order-page");
      document.getElementById("navbar").classList.add("user-navbar");
    }
    if (location.pathname === "/authemail") {
      document.body.classList.add("authemail-page");
    }
    if (location.pathname.startsWith("/forgotpassword/")) {
      document.body.classList.add("changepass-page");
    }
    if (location.pathname.startsWith("/chat/")) {
      document.getElementsByClassName("app")[0].classList.remove("widthInApp");
    }
  }, [location]);

  return null;
};

const App = () => {
  const { loading } = useContext(StoreContext);
  const location = useLocation();
  const hideLayout =
    location.pathname === "/" ||
    location.pathname.startsWith("/otp/") ||
    location.pathname === "/authemail" ||
    location.pathname.startsWith("/forgotpassword") ||
    location.pathname.startsWith("/chat/");
  return (
    <>
      <BodyClassController />
      <Toaster />
      <Loading show={loading} />
      <div className="app">
        <div className="navbar-box">{!hideLayout && <Navbar />}</div>

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/" element={<Login />} />
          <Route path="/otp/:token" element={<OTP />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/authemail" element={<AuthEmail />} />
          <Route path="/forgotpassword/:email" element={<ForgotPass />} />
          {/* <Route path="/chat/:id" element={<ChatHome />} /> */}
        </Routes>
      </div>
      
      {!hideLayout && <Footer />}
    </>
  );
};

export default App;
