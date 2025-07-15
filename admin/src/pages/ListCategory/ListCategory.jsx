import React, { useState, useEffect } from "react";
import "./ListCategory.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ListCategory = ({ url }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const getAllCategory = async () => {
    const category = await axios.get(`${url}/api/category/list`);
    if (category.data.success) {
      setCategoryList(category.data.data);
    }
  };
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    // console.log(response.data);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    getAllCategory();
    fetchList();
  }, []);
  return (
    <div className="listcategory">
      <p className="listcategory-header">All Categories</p>
      <div className="listcategory-total">
        <p>Total Categories: {categoryList.length}</p>
        <p>Total Food Items: {list.length}</p>
      </div>
      <div className="category-table-format categoty-title">
        <b>Image</b>
        <b>Name</b>
        <b className="!ml-[15vw]">Food</b>
        <b className="!mr-[3vw]">Update</b>
        <b>Remove</b>
      </div>

      {categoryList.map((item, index) => {
        return (
          <div className="category-table-format table-category" key={index}>
            <img src={item.url} alt=""  />
            <p>{item.name}</p>
            <div className="category-food-item">
              {list.map((food, index) => {
                if (food.category === item.name) {
                  return (
                    <div className="food-image" key={index}>
                      <img src={food.url} alt=""  />
                      <p>{food.name}</p>
                    </div>
                  );
                }
              })}
            </div>
            <button
              className="update"
              onClick={() => {
                navigate(`/updatecategory/${item._id}`);
              }}
            >
              Update
            </button>
            <button className="remove">Remove</button>
          </div>
        );
      })}
    </div>
  );
};

export default ListCategory;
