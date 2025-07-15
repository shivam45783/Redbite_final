import React, { useContext, useState } from "react";
import "./UserDetails.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const UserDetails = () => {
  const { userDetails, token, url } = useContext(StoreContext);
  const navigate = useNavigate();
  // const [data, setData] = useState({});
  // const [editName, setEditName] = useState(false);
  // const [editEmail, setEditEmail] = useState(false);

  // const forgotPassword = async () => {
  //   const response = await axios.post(
  //     `${url}/api/user/forgotpassword`,
  //     {},
  //     { headers: { token } }
  //   );
  //   if (response.data.success) {
  //     toast.success(response.data.message);
  //     navigate("/home");
  //   }
  // };
  return (
    <>
      <div className="detail-container flex flex-col justify-center items-center glass-mirror !mt-[130px] !mb-[50px]">
        <h1>Profile</h1>
        <div className="name-box">
          <h2>Name:</h2>
          <p className>{userDetails.name}</p>
          {/* <input
          type="text"
          value={userDetails.name}
          
          /> */}
          {/* <button
          className={`${editName ? "input-hide" : ""}`}
          onClick={() => setEditName(!editName)}
        >
          Edit
        </button>
        <button
        className={`${editName ? "" : "input-hide"}`}
          onClick={() => setEditName(!editName)}
          >
          Save
          </button> */}
        </div>
        <div className="email-box">
          <h2>Email:</h2>
          <p>{userDetails.email}</p>
          {/* <input
          type="text"
          value={userDetails.email}
          
          /> */}
          {/* <button
          className={`${editEmail ? "input-hide" : ""}`}
          onClick={() => setEditEmail(!editEmail)}
          >
          Edit
        </button>
        <button
          className={`${editEmail ? "" : "input-hide"}`}
          onClick={() => setEditEmail(!editEmail)}
        >
        Save
        </button> */}
        </div>
        <div className="password-box" onClick={() => navigate("/authemail")}>
          <p>Forgot Password</p>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
