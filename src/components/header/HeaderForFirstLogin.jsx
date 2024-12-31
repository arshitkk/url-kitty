import React from 'react'
import { NavLink } from "react-router-dom";
import DarkMode from "../pages/mini_component/DarkMode.jsx";
function HeaderForFirstLogin() {
  return (
    <nav className="w-full border h-11 border-black/20 flex justify-between items-center p-1  dark:bg-[#1F2937] dark:text-white ease duration-700 ">
      <div className=" flex items-center justify-center">
        <NavLink to={"/first-login"}>
          {" "}
          <div className="relative bg-contain bg-no-repeat dark:bg-[url('/Logo-dark.svg')] bg-[url('/Logo.svg')] h-12 w-12 "></div>
        </NavLink>
        <div className="shadow-xl absolute bg-black dark:bg-white h-6 w-[0.05rem] top-11 left-5"></div>
        <div className="  rounded-full absolute top-[4.26rem] left-[0.38rem]">
          <DarkMode />
        </div>
      </div>
      <ul className=" flex gap-3 text-sm font-semibold items-center justify-center pr-4">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "h-9 w-16 flex items-center justify-center rounded-md bg-black dark:bg-[#2563EB] text-white"
                : "h-9 w-16 flex items-center justify-center rounded-md  dark:text-white"
            }
            to={"/first-login"}
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HeaderForFirstLogin