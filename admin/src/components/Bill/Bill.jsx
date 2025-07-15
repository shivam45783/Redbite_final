// components/Bill.js
import React, { forwardRef } from "react";
import "./Bill.css";
import { assets } from "../../assets/assets";

const Bill = forwardRef(({ order, date }, ref) => {
  const items = order.items;
  //   const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <div ref={ref} className="bill">
      <div className="bill-header">
        <img src={assets.logo_white_no_bg} alt="" />
        <h2>Order Invoice</h2>
        <p>Date: {date}</p>
        <p>Order ID: #{order._id}</p>
      </div>
      <div className="customer-info">
        <h2>Customer Information:</h2>
        <p>
          <span>Name:</span>{" "}
          {order.address.firstName + " " + order.address.lastName}
        </p>
        <p>
          <span>Email:</span>{" "} {order.address.email}
        </p>
        <p>
          <span>Phone:</span>{" "} {order.address.phone}
        </p>
        <p>
          <span>Address:</span>{" "}
          {order.address.street +
            ", " +
            order.address.city +
            ", " +
            order.address.state +
            ", " +
            order.address.country +
            ", " +
            order.address.zipCode}
        </p>
      </div>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="footer">
        <h1 className="total-amount">Total: ₹{order.amount}</h1>
        <p>
          Thanks for letting us be part of your meal today! Cravings? We’re just
          one order away.
        </p>
        <h1 className="signature">"Crave It, RedBite It!"</h1>
      </div>
    </div>
  );
});

export default Bill;
