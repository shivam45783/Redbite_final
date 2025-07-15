import React, { useEffect, useState, useContext } from "react";
import "./OTP.css";
import { useParams, useNavigate } from "react-router-dom";
import { InputOtp } from "primereact/inputotp";
import { assets } from "../../assets/assets";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext.jsx";
import toast from "react-hot-toast";
const OTP = () => {
  const { token } = useParams();
  const [otp, setOTP] = useState("");
  const { url,  } = useContext(StoreContext);
  const navigate = useNavigate();
  const verifyUser = async () => {
    try {
      const response = await axios.post(`${url}/api/mail/auth`, {
        token,
        otp,
      });
      if (response.data.success) {
        localStorage.setItem("token", token);
        toast.success(response.data.message);
        
        navigate("/home");
      } else  {
        toast.error("Something went wrong")
      }
    } catch (error) {
     
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message); // 
        setOTP("");
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error:", error);
    }
  };
  const resendOTP = async () => {
    try {
      const mailResponse = await axios.post(`${url}/api/mail/send`, {
        token,
        subject: "Account Verification",
      });
      if (mailResponse.data.success) {
        setOTP("");
        toast.success("Email resent successfully");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="otp-box">
      <div className="otp-container">
        <img src={assets.logo_white_no_bg} alt="" />
        <h1>Verify your email</h1>
        <p>Please enter the OTP sent to your email</p>
        <div className="otp">
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
        <button className="verify-btn" onClick={verifyUser}>
          Verify
        </button>
        <p>
          Don't receive OTP?{" "}
          <span href="" onClick={resendOTP}>
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default OTP;
