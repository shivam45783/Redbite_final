import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
// import toast from "react-hot-toast";
import axios from "axios";

import { toast } from "react-toastify";
const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  const imageCheck = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;
      if (
        (width === 360 && height === 260) ||
        (width === 360 && height === 280)
      ) {
        setImage(file);
      } else {
        toast.error("Image must be 360x260 or 360x280 px only");
        e.target.value = null;
      }
    };
    img.onerror = () => {
      toast.error("Upload image only");
    };
  };
  const getCategory = async () => {
    const category = await axios.get(`${url}/api/category/list`);
    if (category.data.success) {
      setCategoryList(category.data.data);
    }
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    if (data.name === "") {
      toast.error("Enter Product Name");
      return;
    } else if (data.description === "") {
      toast.error("Enter Product Description");
      return;
    } else if (data.price === "") {
      toast.error("Enter Product Price");
      return;
    } else if (image === false) {
      toast.error("Upload Product Image");
      return;
    } else if (data.category === "") {
      toast.error("Select Product Category");
      return;
    } else if (data.price < 0) {
      toast.error("Price must be greater than 0");
      return;
    } 
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    const foodData = formData;

    const response = await axios.post(`${url}/api/food/add`, foodData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      });
      setImage(false);
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(()=>{
    getCategory();
  },[])
  return (
    <div className="add">
      <form action="" className="col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload ">
          <div className="add-heading">
            <h1>Add Product</h1>
          </div>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="upload-area"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            onChange={(e) => imageCheck(e.target.files[0])}
          />
        </div>
        <div className="add-product-name ">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Write about your product"
            onChange={(e) => setData({ ...data, description: e.target.value })}
            value={data.description}
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-product-category">
            <p>Product Category</p>
            <select
              name="category"
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            >
              {categoryList.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price">
            <p>Product Price</p>
            <span className="product-price">
              ₹
            </span>
            <input
              type="number"
              name="price"
              className="!pl-[18px]"
              onChange={(e) => setData({ ...data, price: e.target.value })}
              value={data.price}
            />
          </div>
        </div>
        <button
          type="submit"
          className="add-btn"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
