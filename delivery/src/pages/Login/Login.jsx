import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
const Login = ({ url }) => {
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    id: "",
    password: "",
  });
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!data.id || !data.password) {
      return toast.error("Please fill all the fields");
    }
    const response = await axios.post(`${url}/api/rider/login`, data);
    if (response.data.success) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (response.data.rider.authorized == false) {
        navigate(`/auth/${token}}`);
      } else {
        navigate("/home");
      }
    } else {
      if (response.data.message) {
        return toast.error(response.data.message);
      }
    }
  };
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div className="rider-login-box">
      <div className="container">
        <div className="info">
          <div className="header">
            <img src={assets.logo_black_no_bg} alt="" />
            <h1 className="font-bold text-2xl">Delivery Panel</h1>
          </div>
          <div className="content">
            <p>
              RedBite provides riders a secure and user-friendly platform that
              allows riders to accept and deliver orders safely and efficiently.
            </p>
            <h1 className="font-[500]"> Get started with RedBite today!</h1>
          </div>
          <div></div>
        </div>

        <form
          className={`${showLogin ? "" : "hidden"}  login`}
          onSubmit={onSubmitHandler}
        >
          <h1 className="font-bold">Log in</h1>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Id"
              className="relative"
              value={data.id}
              onChange={(e) => setData({ ...data, id: e.target.value })}
            />
            <div className="login-info">
              <p>
                Admin generates a unique ID and a temporary password for each
                rider. After your first login, you must change your Id and
                password.
              </p>
            </div>
          </div>

          <div className="input-wrapper">
            <input
              type={`${showPass ? "text" : "password"}`}
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <img
              src={showPass ? assets.hide : assets.visible}
              alt=""
              onClick={() => setShowPass(!showPass)}
            />
          </div>

          <button className="login-button-delivery" type="submit">
            Log in
          </button>
        </form>
        {/* <div className={`${showLogin ? "hidden" : ""} new-password`}>
          <p>Forgot Password?</p>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
