import React, { useEffect, useState } from "react";
import "./Update.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const Update = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  });
  const [categoryList, setCategoryList] = useState([]);
  const fetchImageAsBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fullName = url.split("/").pop();
    const fileName = fullName.substring(fullName.indexOf("-") + 1);
    return new File([blob], fileName, { type: blob.type });
  };
  const getAllCategory = async () => {
    const category = await axios.get(`${url}/api/category/list`);
    if (category.data.success) {
      setCategoryList(category.data.data);
    }
  };
  const retriveData = async (id) => {
    try {
      const response = await axios.get(`${url}/api/food/get/${id}`);
      console.log(response.data);

      if (response.data.success) {
        setData({
          name: response.data.data.name,
          description: response.data.data.description,
          category: response.data.data.category,
          price: response.data.data.price,
        });
        setFile(await fetchImageAsBlob(`${response.data.data.url}`));
        setImage(`${response.data.data.url}`);
      } else {
        toast.error(response.data.message);
        // console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const imageCheck = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;
      if (
        (width === 360 && height === 260) ||
        (width === 360 && height === 280)
      ) {
        setImage(URL.createObjectURL(file));
        setFile(file);
      } else {
        toast.error("Image must be 360x260 or 360x280 px only");
        e.target.value = null;
      }
    };
    img.onerror = () => {
      toast.error("Upload image only");
    };
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (data.price < 0) {
      toast.error("Price must be greater than 0");
      return;
    }
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
    formData.append("image", file);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);
    const foodData = formData;
    const response = await axios.post(`${url}/api/food/update/${id}`, foodData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        name: "",
        description: "",
        category: "",
        price: "",
      });
      setImage(false);
      navigate("/list");
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    retriveData(id);
    getAllCategory();
    // console.log(id);
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="add">
      <form action="" className="col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload col">
          <div className="add-heading">
            <h1>Upload Image</h1>
          </div>
          <label htmlFor="image">
            <img src={image ? image : assets.upload_area} alt="" />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required={!image}
            onChange={(e) => {
              imageCheck(e.target.files[0]);
              setFile(e.target.files[0]);
            }}
          />
        </div>
        <div className="add-product-name">
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
        <div className="add-category-price flex gap-7">
          <div className="add-category">
            <p>Product category</p>
            <select
              name="category"
              value={data.category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            >
              {categoryList.map((category) => (
                <option value={category.name} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price">
            <p>Product price</p>
            <span className="">
              ₹
            </span>
            <input
              type="number"
              name="price"
              className=""
              onChange={(e) => setData({ ...data, price: e.target.value })}
              value={data.price}
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
