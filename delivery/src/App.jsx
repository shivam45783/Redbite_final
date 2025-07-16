import React from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login/Login";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Orders from "./pages/Orders/Orders";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const url = "https://redbite-final-backend.onrender.com";
  const hideLocation =
    location.pathname === "/" || location.pathname.startsWith("/auth");
  const BodyClassController = () => {
    useEffect(() => {
      document.body.className = "";
      if (location.pathname === "/" || location.pathname.startsWith("/auth")) {
        document.body.classList.add("login-page");
        document.getElementById("app").classList.add("app");
      }
      else {
        document.body.classList.remove("home-page");
        document.getElementById("app").classList.remove("app");
      }
      
    });
    return null;
  };

  return (
    <>
      <BodyClassController />
      {!hideLocation && <Navbar />}
      <div className="flex" id="app">
        {!hideLocation && <Sidebar />}
        <Routes>
          <Route path="/" element={<Login url={url} />} />
          <Route path="/auth/:token" element={<Auth url={url} />} />
          <Route path="/home" element={<Home url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
