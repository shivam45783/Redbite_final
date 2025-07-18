import React, { use, useContext, useEffect, useState } from "react";
import "./Login.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const {
    url,
    token,
    setToken,
    getUserDetails,
    dataFetching,
    setDataFetching,
    userDetails,
    setLoading,
    loading,
  } = useContext(StoreContext);
  const [activeWebContainer, setActiveWebContainer] = useState(true);
  const [activeMobileContainer, setActiveMobileContainer] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin_web = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (activeWebContainer) {
      newUrl = newUrl += "/api/user/register";
    } else {
      newUrl = newUrl += "/api/user/login";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      if (newUrl == url + "/api/user/login") {
        localStorage.setItem("token", response.data.token);
      }

      setDataFetching(true);
      getUserDetails(response.data.token);
      if (newUrl === url + "/api/user/register") {
        setLoading(true);
        const mailResponse = await axios.post(`${url}/api/mail/send`, {
          token: response.data.token,
          subject: "Account Verification",
        });
        if (!mailResponse.data.success) {
          toast.error(mailResponse.data.message);
          setLoading(false);
        } else {
          toast.success(mailResponse.data.message);
          navigate("/otp/" + response.data.token);
          setLoading(false);
          return;
        }
      }

      navigate("/home");
      setLoading(false);
      toast.success(response.data.message);
    } else if (response.data.message === "User not found") {
      localStorage.removeItem("token");
      setToken("");
      setData({ name: "", email: "", password: "" });
      setLoading(false);
      toast.error(response.data.message);
    } else {
      setLoading(false);
      localStorage.removeItem("token");
      setToken("");
      toast.error(response.data.message);
    }
  };
  const onLogin_mobile = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (activeMobileContainer) {
      newUrl = newUrl += "/api/user/register";
    } else {
      newUrl = newUrl += "/api/user/login";
    }

    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      if (newUrl == url + "/api/user/login") {
        localStorage.setItem("token", response.data.token);
      }
      setDataFetching(true);
      getUserDetails(response.data.token);
      if (newUrl === url + "/api/user/register") {
        setLoading(true);
        const mailResponse = await axios.post(`${url}/api/mail/send`, {
          token: response.data.token,
          subject: "Account Verification",
        });
        if (!mailResponse.data.success) {
          toast.error(mailResponse.data.message);
          setLoading(false);
        } else {
          toast.success(mailResponse.data.message);
          navigate("/otp/" + response.data.token);
          setLoading(false);
          return;
        }
      }

      navigate("/home");
      setLoading(false);
      toast.success(response.data.message);
    } else if (response.data.message === "User not found") {
      localStorage.removeItem("token");
      setToken("");
      setData({ name: "", email: "", password: "" });
      setLoading(false);
      toast.error(response.data.message);
    } else {
      setLoading(false);
      localStorage.removeItem("token");
      setToken("");
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);
  return (
    <>
      <div className="box">
        <div
          className={`container ${
            activeWebContainer ? "active" : ""
          } desktop-menu`}
          id="container"
        >
          <div className="form-container sign-up">
            <form onSubmit={onLogin_web}>
              <img src={assets.logo_white_no_bg} alt="" className="w-[100px]" />
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                className="focus:border-black"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />

              <div className="password flex w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                />
                <img
                  src={showPassword ? assets.hide : assets.visible}
                  alt=""
                  className="w-[15px] absolute right-2 top-[35%] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <button type="submit">Sign Up</button>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
              >
                Skip
              </a>
            </form>
          </div>
          <div className="form-container sign-in">
            <form onSubmit={onLogin_web}>
              <img src={assets.logo_white_no_bg} alt="" className="w-[8vw]" />
              <h1>Sign In</h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />
              <div className="password flex w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                />
                <img
                  src={showPassword ? assets.hide : assets.visible}
                  alt=""
                  className="w-[15px] absolute right-2 top-[35%] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  navigate("/authemail");
                }}
              >
                Forgot Password
              </a>
              <button type="submit">Sign In</button>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
              >
                Skip
              </a>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome!</h1>
                <p>Enter your details and start journey with us</p>
                <button
                  className="hidden_button "
                  id="login"
                  onClick={() => {
                    setActiveWebContainer(false);
                    setData({
                      name: "",
                      email: "",
                      password: "",
                    });
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Welcome Back!</h1>
                <p>Register with your personal details</p>
                <button
                  className="hidden_button "
                  id="register"
                  onClick={() => {
                    setActiveWebContainer(true);
                    setData({
                      name: "",
                      email: "",
                      password: "",
                    });
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="mobile-menu">
          <div
            className={`form-container-mobile sign-up-mobile ${
              activeMobileContainer ? "" : "activeMobile"
            }`}
          >
            <form className="mobile-form" onSubmit={onLogin_mobile}>
              <img src={assets.logo_white_no_bg} alt="" className="w-[100px]" />
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="Name"
                className="focus:border-black"
                name="name"
                onChange={onChangeHandler}
                value={data.name}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />
              <div className="password flex w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                />
                <img
                  src={showPassword ? assets.hide : assets.visible}
                  alt=""
                  className="w-[15px] absolute right-1 translate-y-[50%] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              <button type="submit">Sign Up</button>
              <span>
                Already have an account?
                <a
                  href="#"
                  className="text-blue-600 hover:underline cursor-pointer p-0.5"
                  onClick={() => {
                    setActiveMobileContainer(false);
                    setData({
                      name: "",
                      email: "",
                      password: "",
                    });
                  }}
                >
                  Sign In
                </a>
              </span>

              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
              >
                Skip
              </a>
            </form>
          </div>
          <div
            className={`form-container-mobile sign-in-mobile ${
              activeMobileContainer ? "activeMobile" : ""
            }`}
          >
            <form className="mobile-form" onSubmit={onLogin_mobile}>
              <img src={assets.logo_white_no_bg} alt="" className="w-[100px]" />
              <h1>Sign In</h1>

              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
              />
              <div className="password flex w-full relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                />
                <img
                  src={showPassword ? assets.hide : assets.visible}
                  alt=""
                  className="w-[15px] absolute right-1 translate-y-[50%] cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              <button type="submit">Sign In</button>
              <span>
                Don't have an account?
                <a
                  href="#"
                  className="text-blue-600 hover:underline cursor-pointer p-0.5"
                  onClick={() => {
                    setActiveMobileContainer(true);
                    setData({
                      name: "",
                      email: "",
                      password: "",
                    });
                  }}
                >
                  Create Account
                </a>
              </span>

              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home");
                }}
              >
                Skip
              </a>
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  navigate("/authemail");
                }}
              >
                Forgot Password
              </a>
            </form>
          </div>
        </div>
      </div>
      <Loading show={loading ? true : false} />
    </>
  );
};

export default Login;
