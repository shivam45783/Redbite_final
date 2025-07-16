import React, { useEffect, useState } from "react";
import "./Rider.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
const Rider = ({ url }) => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });
  const [rider, setRider] = useState({});
  const [showCred, setShowCred] = useState(false);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (data.name === "") {
      toast.error("Enter Name");
      return;
    } else if (data.phone === "" || data.phone.length !== 10) {
      toast.error("Enter valid phone Number");
      return;
    } else if (data.address === "") {
      toast.error("Enter Address");
      return;
    } else if (data.email === "") {
      toast.error("Enter Email");
      return;
    }
    const response = await axios.post(`${url}/api/rider/add`, data);
    if (response.data.success) {
      toast.success(response.data.message);
      // console.log(response.data.data);
      setRider(response.data.data);
      setData({ name: "", phone: "", address: "", email: "" });
      setShowCred(true);
    } else {
      toast.error(response.data.message);
      // console.log(response.data);
    }
  };

  return (
    <div className="rider-box">
      <form
        className={`${showCred ? "hidden" : ""} rider-container`}
        onSubmit={onSubmitHandler}
      >
        <h1 className="rider-title font-bold ">Add Rider</h1>
        <div className="riderInfo">
          <div className="rider_info name">
            <p>Name</p>
            <input
              type="text"
              placeholder="Name"
              name="Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="rider_info phone">
            <p>Phone</p>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </div>
          <div className="rider_info address">
            <p>Address</p>
            <textarea
              type="text"
              placeholder="Address"
              rows="6"
              name="Address"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </div>
          <div className="rider_info email">
            <p>Email</p>
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
        </div>
        <button type="submit">Generate Rider</button>
      </form>
      {showCred && (
        <div className={`${showCred ? "" : "hidden"} rider-credentials`}>
          <div className="rider-header">
            <img src={assets.close} alt="" onClick={() => setShowCred(false)} />
            <h1 className="font-bold ">Rider Credentials</h1>
          </div>
          <div className="riderId">
            <p>Id</p>
            <input type="text" value={rider?.riderId} readOnly />
            <img
              src={assets.copy}
              alt=""
              onClick={() => copyToClipboard(rider?.riderId)}
            />
          </div>
          <div className="riderPass">
            <p>Password</p>
            <input type="password" value={rider?.password} readOnly />
            <img
              src={assets.copy}
              alt=""
              onClick={() => copyToClipboard(rider?.password)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Rider;
