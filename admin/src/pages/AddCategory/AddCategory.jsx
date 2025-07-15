import React, { useState } from "react";
import "./AddCategory.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useEffect } from "react";
const Category = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({name:""});
const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (data.name === "") {
      toast.error("Enter Category Name");
      return;
    } if (image === false) {
      toast.error("Upload Category Image");
      return;
    }
    formData.append("image", image);
    formData.append("name", data.name);
    const response = await axios.post(`${url}/api/category/add`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({name:""});
      setImage(false);
    } else {
      toast.error(response.data.message);
    }
}  
    useEffect(()=>{
        // console.log(data.name);
        
    },[data])
  return (
    <div className="category-container">
      <form onSubmit={onSubmitHandler}>
        <div className="add-category-upload">
          <div className="add-category-heading">
            <h1>Add Category</h1>
          </div>
          <p className="">Upload Image</p>
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
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="category-name">
          <p>Category Name</p>
          <input
            type="text"
            placeholder="Enter category name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            
          />
        </div>
        <button
          type="submit"
          className="category-add-btn"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Category;
