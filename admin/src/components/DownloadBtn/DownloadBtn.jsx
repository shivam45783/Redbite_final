// components/DownloadButton.js
import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import Bill from "../Bill/Bill";
import "./DownloadBtn.css";
const DownloadButton = ({ order }) => {
  const billRef = useRef();

  // 🔹 Example order data — can come from API, props, state, etc.
  const pad = (n) => n.toString().padStart(2, "0");

  const orderDate = new Date(order.createdAt);
  const date = `${pad(orderDate.getDate())}/${pad(
    orderDate.getMonth() + 1
  )}/${orderDate.getFullYear()} ${pad(orderDate.getHours())}:${pad(
    orderDate.getMinutes()
  )}`;
  

  const handleDownload = () => {
    const element = billRef.current;
    const options = {
      margin: 0.5,
      filename: `order_${order._id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  return (
    <div>
      <div className="hidden">
        <Bill ref={billRef} order={order} date={date} />
      </div>
      <button onClick={handleDownload} className="download-btn">
        Download Bill
      </button>
    </div>
  );
};

export default DownloadButton;
