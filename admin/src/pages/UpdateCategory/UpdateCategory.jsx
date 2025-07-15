import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UpdateCategory.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
const UpdateCategory = ({ url }) => {
  const { id } = useParams();
  const [image, setImage] = useState(false);
  const [data, setData] = useState({});
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const retriveCategory = async () => {
    const response = await axios.get(`${url}/api/category/get/${id}`);
    if (response.data.success) {
      setData(response.data.data);
      setImage(`${response.data.data.url}`);
      setFile(await fetchImageAsBlob(`${response.data.data.url}`));
    }
  };
  const fetchImageAsBlob = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fullName = url.split("/").pop();
    const fileName = fullName.substring(fullName.indexOf("-") + 1);
    return new File([blob], fileName, { type: blob.type });
  };
  const imageCheck = (file) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const { width, height } = img;
      if (width <= 132 && width >= 129 && height <= 132 && height >= 129) {
        setImage(URL.createObjectURL(file));
        setFile(file);
      } else {
        toast.error("Image must be between 130x130 to 132x132 only");
        e.target.value = null;
      }
    };
    img.onerror = () => {
      toast.error("Upload image only");
    };
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (data.name === "") {
      toast.error("Enter Category Name");
      return;
    } else if (image === false) {
      toast.error("Upload Category Image");
      return;
    }
    formData.append("image", file);
    formData.append("name", data.name);
    const response = await axios.patch(
      `${url}/api/category/update/${id}`,
      formData
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setData({ name: "" });
      setImage(false);
      setFile(null);
      navigate("/listcategory");
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    retriveCategory();
  }, []);
  return (
    <div className="add">
      <form onSubmit={onSubmitHandler}>
        <div className="add-category-img-upload ">
          <div className="category-heading">
            <p>Upload Image</p>
          </div>
          <label htmlFor="image">
            <img
              src={image ? image : assets.upload_area}
              alt=""
              className="w-[85px]"
            />
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
        <div className="add-category-name">
          <p>Category Name</p>
          <input
            type="text"
            placeholder="Enter Category Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <button type="submit" className="add-category-btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
