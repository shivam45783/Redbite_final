import React from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
  const navigate = useNavigate();
  const {
    getTotalCartAmount,
    deliveryCharges,
    food_list,
    cartItems,
    token,
    url,
    setCartItems,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  let amountDetails = {
    subTotal: getTotalCartAmount(),
    deliveryCharge:
      getTotalCartAmount() > 500
        ? 0
        : getTotalCartAmount() > 0
        ? deliveryCharges
        : 0,
    Total:
      getTotalCartAmount() > 500
        ? getTotalCartAmount()
        : getTotalCartAmount() === 0
        ? 0
        : getTotalCartAmount() + deliveryCharges,
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const placeOrder = async (e) => {
    try {
      e.preventDefault();
      if (data.phone.length < 10 || data.phone.length > 10) {
        toast.error("Please enter a valid phone number");
        return;
      }
      let orderItems = [];
      food_list.map((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      });
      // console.log(orderItems);
      let orderData = {
        address: data,
        items: orderItems,
        amount: amountDetails.Total,
      };
      let response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        setCartItems({});
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  // useEffect(() => {
  //   console.log(amountDetails);

  // }, [amountDetails]);
  useEffect(()=>{
    if(!token){
      navigate("/");
      toast.error("Please login to place order");
    } 
    // else if (getTotalCartAmount() === 0) {
    //   navigate("/cart");
    //   toast.error("Cart is empty");
    // }
  },[token])
  return (
    <form
      onSubmit={placeOrder}
      className="place-order flex items-start justify-between gap-[50px] !mt-[140px]"
    >
      <div className="place-order-left w-full max-w-[max(30%,500px)] text-[14px]">
        <p className="title font-semibold !mb-[50px] text-[30px]">
          Delivery Information
        </p>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email address"
          onChange={onChangeHandler}
          name="email"
          value={data.email}
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            required
            type="text"
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            className=""
          />
        </div>
        <div className="multi-fields">
          <input
            required
            type="text"
            placeholder="Zip Code"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
          />
          <input
            required
            type="text"
            placeholder="Country"
            name="country"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          required
          type="number"
          placeholder="Phone"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          className=""
        />
      </div>
      <div className="place-order-right w-full max-w-[max(40%,500px)]">
        <div className="cart-total flex flex-col gap-[20px] flex-1">
          <h2 className="font-semibold">Cart Total:</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>
                ₹
                {getTotalCartAmount() > 500
                  ? 0
                  : getTotalCartAmount() > 0
                  ? deliveryCharges
                  : 0}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartAmount() > 500
                  ? getTotalCartAmount()
                  : getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharges}
              </b>
            </div>
          </div>
          <button type="submit" className="!mt-[30px]">
            Proceed to payment
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
