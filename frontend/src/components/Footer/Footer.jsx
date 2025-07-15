import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div
      className="footer text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-5 !pt-[80px] !pl-[8vw] !pr-[8vw] !pb-[20px] !mt-[10px]"
      id="footer"
    >
      <div className="footer-content w-full">
        <div className="footer-content-left">
          <img
            src={assets.logo_black_no_bg}
            alt=""
            className="w-[max(8vw,70px)] hover:scale-[1.05] cursor-pointer logo_footer-content-left"
            onClick={() => {
              navigate("/home")
              scrollTo(0, 0);
            }}
          />
          <p>
            Get your favourite food delivered to your doorstep with ease and
            speed. Enjoy Lipsmackin' food and exceptional service.
          </p>
          <p className="font-semibold ">"Crave It, RedBite It!"</p>
          <div className="footer-social-icons ">
            <a
              className="linkedin flex w-full justify-center items-center hover:scale-[1.05]"
              href="https://www.linkedin.com/in/shivam-rajan-68238b31a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noreferrer"
            >
              <img
                id="linkedin"
                src={assets.linkedin_icon}
                alt=""
                className="!m-2 cursor-pointer "
              />
              <label htmlFor="linkedin" className="cursor-pointer">
                Shivam Rajan
              </label>
            </a>
            <a
              className="github flex w-full justify-center items-center cursor-pointer hover:scale-[1.05]"
              href="https://github.com/shivam45783"
              target="_blank"
              rel="noreferrer"
            >
              <img
                id="github"
                src={assets.github_icon}
                alt=""
                className="!m-2 cursor-pointer "
              />
              <label htmlFor="github" className="cursor-pointer">
                shivam45783
              </label>
            </a>
          </div>
        </div>

        <div className="footer-content-center">
          <h2>RedBite</h2>
          <ul>
            <li onClick={() =>{ 
              navigate("/home")
              scrollTo(0, 0);
              }}>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-212-555-5555</li>
            <li
              onClick={() =>
                (window.location.href = "mailto:service.redbite@gmail.com")
              }
            >
              service.redbite@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright &copy; 2025 RedBite - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
