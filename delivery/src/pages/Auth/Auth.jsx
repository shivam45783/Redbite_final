import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Auth.css";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
const Auth = ({ url }) => {
  const { token } = useParams();
  const [data, setData] = useState({
    id: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const tokenId = localStorage.getItem("token");
    if (!data.id || !data.password || !data.confirmPassword) {
      toast.error("Please fill all the fields");

      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    let sendData = { ...data, tokenId };
    const response = await axios.post(`${url}/api/rider/auth`, sendData);
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/home");
    } else {
      toast.error(response.data.message);
      localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <div className="items-center flex h-lvh w-full justify-center">
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
            <h1 className="font-[500]">Get started with RedBite today!</h1>
          </div>
          <div></div>
        </div>

        <form className="login" onSubmit={onSubmitHandler}>
          <h1 className="font-bold">Change Credentials</h1>

          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Id"
              className="relative"
              value={data.id}
              onChange={(e) => setData({ ...data, id: e.target.value })}
            />
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
          <div className="input-wrapper">
            <input
              type={`${showConfirmPass ? "text" : "password"}`}
              placeholder="Comfirm Password"
              value={data.confirmPassword}
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }
            />
            <img
              src={showConfirmPass ? assets.hide : assets.visible}
              alt=""
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            />
          </div>

          <button className="login-button" type="submit">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
