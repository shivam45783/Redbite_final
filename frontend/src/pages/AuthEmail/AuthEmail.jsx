import React, { useEffect, useState } from "react";
import "./AuthEmail.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import Loading from "../../components/Loading/Loading";
const AuthEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { url, loading, setLoading } = useContext(StoreContext);
  const authEmail = async () => {
    const response = await axios.post(`${url}/api/mail/verify`, {
      email,
      subject: "Account Verification",
    });
    if (response.data.success) {
      toast.success(response.data.message);
      navigate("/forgotpassword/" + email);
    } else {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    setLoading(false);
  });
  return (
    <>
      <div className="auth-upbox">
        <div className="auth-box ">
          <div className="auth-container glass">
            <img src={assets.logo_white_no_bg} alt="" />
            <h1>Verify your email</h1>
            <div className="auth-email">
              <p>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button onClick={authEmail}>Verify</button>
          </div>
        </div>
      </div>
      <Loading show={loading ? "hidden" : ""} />
    </>
  );
};

export default AuthEmail;
