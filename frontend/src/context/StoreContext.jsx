import React, { useEffect, useRef } from "react";
import { createContext, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodlist] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [dataFetching, setDataFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [showCart, setShowCart] = useState(false);
  const menuRef = useRef(null);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const [menu, setMenu] = useState([]);
  const [scrollAnchorRef] = useState({ current: null });

  const getCategory = async () => {
    const menuList = await axios.get(`${url}/api/category/list`);
    if (menuList.data.success) {
      setMenu(menuList.data.data);
    }
  };
  const addToCart = async (itemId) => {
    try {
      if (!cartItems[itemId]) {
        setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
      } else {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
      }

      if (token) {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          {
            headers: {
              token,
            },
          }
        );
      } else {
        setCartItems({});
        toast.error("Please login");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token expired, please login again");
      } else if (error.response?.status === 500) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token not found, please login again");
      } else {
        console.log(error);
      }
    }
  };

  const removeFromCart = (itemId) => {
    try {
      if (cartItems[itemId] > 1) {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      } else {
        setCartItems((prev) => {
          const copy = { ...prev };
          delete copy[itemId];
          return copy;
        });
      }
      if (token) {
        axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          {
            headers: {
              token,
            },
          }
        );
      } else {
        toast.error("Please login");
        navigate("/");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token expired, please login again");
      } else if (error.response?.status === 500) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token not found, please login again");
      } else {
        console.log(error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += cartItems[item] * itemInfo.price;
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response.data);

      if (response.data.success) {
        setFoodlist(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // if (error.response?.status === 401) {
      //   localStorage.removeItem("token");
      //   setToken("");
      //   navigate("/");
      //   toast.error("Token expired, please login again");
      // } else if (error.response?.status === 500) {
      //   localStorage.removeItem("token");
      //   setToken("");
      //   navigate("/");
      //   toast.error("Token not found, please login again");
      // } else {
      //   console.log(error);
      // }
      console.log(error);
    }
  };
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: {
          token,
        },
        // cartPop
      });
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
      // console.log(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token expired, please login again");
      } else if (error.response?.status === 500) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token not found, please login again");
      } else {
        console.log(error);
      }
    }
  };

  const getUserDetails = async (token) => {
    try {
      const response = await axios.get(`${url}/api/user/get`, {
        headers: {
          token,
        },
      });

      if (response.data.success) {
        setUserDetails(response.data.user);
        setDataFetching(false);
        // console.log(response.data.user);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
        toast.error("Token expired, please login again");
      } else if (error.response?.status === 500) {
        {
          localStorage.removeItem("token");
          setToken("");
          navigate("/");
          toast.error("Token not found, please login again");
        }
      }
    }
  };

  const cartActivate = () => {
    if (showCart) {
      document.body.classList.add("activateCart");
    } else {
      document.body.classList.remove("activateCart");
    }
  };

  useEffect(() => {
    async function loadData() {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await getUserDetails(storedToken);
        await loadCartData(storedToken);
        getCategory();
      }
      // else {
      //   if (location.pathname !== "/") {
      //     navigate("/");
      //     toast.error("Log In to continue");
      //   }
      // }
      await fetchFoodList();
    }

    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    deliveryCharges: 20,
    url,
    token,
    setToken,
    loadCartData,
    getUserDetails,
    dataFetching,
    setDataFetching,
    userDetails,
    loading,
    setLoading,
    showCart,
    setShowCart,
    cartActivate,
    menuRef,
    showRightIndicator,
    setShowRightIndicator,
    menu,
    scrollAnchorRef,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
