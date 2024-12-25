import React, { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { RiSunFill } from "react-icons/ri";
function DarkMode() {
  const [DarkMode, setDarkMode] = useState(() => {
    // Initialize state from localStorage or default to false
    const savedMode = localStorage.getItem("DarkMode");
    return savedMode === "true";
  });

  const handleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (DarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("DarkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("DarkMode", "false");
    }
  }, [DarkMode]);

  return (
    <div className={`duration-400  ${DarkMode ? "dark" : ""}`}>
      <label className=" rounded-full shadow-lg  dark:shadow-[#555575] shadow-[#ffff006d]  themeSwitcherTwo  inline-flex cursor-pointer select-none items-center sticky ">
        <input
          type="checkbox"
          checked={DarkMode}
          onChange={handleMode}
          className="sr-only"
        />
        <span className=" border border-black dark:border-white rounded-full p-1 label  dark:text-white text-xl text-black ">
          {DarkMode ? (
            <MdDarkMode />
          ) : (
            <RiSunFill className=" text-yellow-500" />
          )}
        </span>
        {/* <span
          className={` hidden dark:border  slider mx-2 flex h-5 w-[37px] items-center rounded-full p-1 duration-200 ${
            DarkMode ? "bg-[#212b36]" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-3 w-3 rounded-full bg-white duration-200 ${
              DarkMode ? "translate-x-[17px]" : ""
            }`}
          ></span>
        </span> */}
      </label>
    </div>
  );
}

export default DarkMode;
