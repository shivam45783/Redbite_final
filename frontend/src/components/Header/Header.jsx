import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className="header h-[34vw] my-[30px] mx-auto relative ">
      <div className="header-contents absolute flex flex-col items-center gap-1.5 max-w-1/2 bottom-1/10 left-3 text-[16px]">
        <h2 className="font-semibold text-white text-[40px]">
          Order your favourite food here
        </h2>
        {/* <p className="text-white text-[max(1.8vh,10px)]">
          Choose from a diverse menu featuring a variety of dishes crafted with
          finest ingredients. Experience a culinary journey that will tantalize
          your taste buds and leave you craving for more.
        </p> */}

        <button className="border-none bg-white text-shadow-gray-500 rounded-[50px] !py-[1vw] !px-[2.3vw] text-[14px] !m-3 self-start cursor-pointer hover:bg-amber-50 "
        onClick={()=>{
          document.getElementById('explore-menu').scrollIntoView({behavior:"smooth"});
        }}
        >
          View Menu
        </button>
      </div>
    </div>
  );
  }

export default Header