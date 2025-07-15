import React, { useEffect } from "react";
import "./List.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList();
    } else {
      toast.error(response.data.message);
    }
  };
  const updateFood = (foodId) => {
    navigate(`/update/${foodId}`);
  };
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list">
      <p className="list-title">Food Menu</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Update</b>
          <b>Remove</b>
        </div>
        <p className="total-heading">Total Items: {list.length}</p>
        {list.map((item, index) => (
          <div className="list-table-format food-item-single fade-in" key={index}>
            <img
              src={item.url}
              alt=""
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price}</p>
            <button className="update" onClick={() => updateFood(item._id)}>
              Update
            </button>
            <button className="remove" onClick={() => removeFood(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
