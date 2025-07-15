import React, { useContext, useState } from "react";
import "./ForgotPass.css";
import { InputOtp } from "primereact/inputotp";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext.jsx";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const ForgotPass = () => {
  const { url } = useContext(StoreContext);
  const [otp, setOTP] = useState("");
  const [changePass, setChangePass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const email = useParams().email;
  const verifyOTP = async () => {
    try {
      if (otp.length !== 4) {
        toast.error("Please enter a valid OTP");
        return;
      }

      const response = await axios.post(`${url}/api/mail/authmail`, {
        email,
        otp,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setChangePass(true);
      } else {
        toast.error(response.data.message);
        setOTP("");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };
  const changeCredentials = async () => {
    if (password !== confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }
    const response = await axios.post(`${url}/api/user/forgotpassword`, {
      email,
      password,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/home");
    }
  };
  if (!changePass) {
    return (
      <div className="pass-box">
        <div className="pass-container">
          <img src={assets.logo_white_no_bg} alt="" />
          <h1>Verify your email</h1>
          <p>Please enter the OTP sent to your email</p>
          <div className="pass-otp">
            <InputOtp
              value={otp}
              onChange={(e) => setOTP(e.value)}
              length={4}
              integerOnly
              inputStyle={{
                width: "30px",
                height: "35px",
                fontSize: "10px",
                margin: "0 6px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                textAlign: "center",
              }}
            />
          </div>
          <button className="verify-btn" onClick={verifyOTP}>
            Verify
          </button>
          <p>
            Don't receive OTP? <span>Resend</span>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="new_pass_box">
        <div className="new_pass_container">
          <div className="new_pass_heading">
            <img src={assets.logo_white_no_bg} alt="" />
            <h1>Confirm New Password</h1>
          </div>

          <div className="new_pass relative">
            <p>New Password</p>
            <input
              type={`${showPassword ? "text" : "password"}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? assets.hide : assets.visible}
              alt=""
              className="absolute"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <div className="confirm_new_pass relative">
            <p>Confrm New Password</p>
            <input
              type={`${showConfirmPassword ? "text" : "password"}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              src={showConfirmPassword ? assets.hide : assets.visible}
              alt=""
              className="absolute"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
          <button className="verify-btn" onClick={changeCredentials}>
            Change
          </button>
        </div>
      </div>
    );
  }
};

export default ForgotPass;
