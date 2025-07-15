import React, { useEffect, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ url }) => {
  const [showPass, setShowPass] = useState(false);
  const navigate= useNavigate();
  const [data, setData] = useState({
    id: "",
    password: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!data.id || !data.password) {
      return toast.error("Please fill all the fields");
    }
    const response = await axios.post(`${url}/api/admin/login`, data);
    if (response.data.success) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/home");
    } else {
      if (response.data.message) {
        return toast.error(response.data.message);
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <div className="admin-login-box">
      <div className="admin-login-container">
        <div className="info">
          <div className="header">
            <img src={assets.logo_black_no_bg} alt="RedBite logo" />
            <h1 className="font-bold">Admin Panel</h1>
          </div>

          <div className="content">
            {/* <p>
              RedBite provides riders a secure and user‑friendly platform that
              allows them to accept and deliver orders safely and efficiently.
            </p> */}
            <h1 className="font-[500]">Get started with RedBite today!</h1>
          </div>
        </div>

        <form className="login" onSubmit={onSubmitHandler}>
          <h1 className="font-bold">Log in</h1>

          <div className="input-wrapper">
            <input type="text" placeholder="Id" className="relative" value={data.id} onChange={(e) => setData({...data, id: e.target.value})}/>
          </div>

          <div className="input-wrapper">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({...data, password: e.target.value})}
            />
            <img
              src={showPass ? assets.hide : assets.visible}
              alt=""
              onClick={() => setShowPass(!showPass)}
            />
          </div>

          <button className="login-button-admin" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
