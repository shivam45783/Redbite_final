import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import AddCategory from "./pages/AddCategory/AddCategory";
import { Routes, Route, useLocation } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import Update from "./pages/Update/Update";
import ListCategory from "./pages/ListCategory/ListCategory";
import UpdateCategory from "./pages/UpdateCategory/UpdateCategory";
import Rider from "./pages/Rider/Rider";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
const App = () => {
  const url = "https://redbite-final-backend.onrender.com";
  const location = useLocation();
  const hideLocation = 
    location.pathname = "/"
  
  const BodyClassController = () => {
    const location = useLocation();

    useEffect(() => {
      if (location.pathname === "/") {
        document.body.classList.add("login-page");
        
      } else {
        document.body.classList.remove("login-page");
      }
    },[location])
  }
    useEffect(()=>{
      if (location.pathname === "/") {
        
      }
    },[])
  return (
    <div className="app">
      <Toaster />
      <ToastContainer />
      {!hideLocation && <Navbar />}
      <hr />
      <div className="app-content flex ">
        {!hideLocation && <Sidebar />}
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          <Route path="/update/:id" element={<Update url={url} />} />
          <Route path="/category" element={<AddCategory url={url} />} />
          <Route path="/listcategory" element={<ListCategory url={url} />} />
          <Route path="/updatecategory/:id" element={<UpdateCategory url={url} />} />
          <Route path="/rider" element={<Rider url={url} />} />
          <Route path="/home" element={<Home url={url}/>} />
          <Route path="/" element={<Login url={url}/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
