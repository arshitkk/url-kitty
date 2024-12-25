import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/config";
import { FiLogOut } from "react-icons/fi";
import DarkMode from "../pages/mini_component/DarkMode.jsx";
function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [mode, setMode] = useState();

  useEffect(() => {
    // Check if there is a session on component mount
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setLoggedIn(true); // User is logged in
      } else {
        setLoggedIn(false); // No session, user is logged out
      }
    };

    fetchSession();

    // Listen for auth state changes
  });

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login");
      console.log("Logged out");
    } else {
      console.error("Logout error:", error.message);
    }
  };
  let check;
  useEffect(() => {
    function checking() {
      check = localStorage.getItem("DarkMode");
      if (check === "true") {
        setMode("Logo-dark.svg");
        console.log("dark");
      }
      if (check === "false") {
        setMode("Logo.svg");
        console.log("light");
      }
    }
    checking();
  }, [check]);

  return (
    <nav className="w-full border h-11 border-black/20 flex justify-between items-center p-1  dark:bg-[#1F2937] dark:text-white ease duration-700 ">
      <div className=" flex items-center justify-center">
        <NavLink to={"/"}>
          {" "}
          <div className="relative bg-contain bg-no-repeat dark:bg-[url('/Logo-dark.svg')] bg-[url('/Logo.svg')] h-12 w-12 "></div>
        </NavLink>
          <div className="shadow-xl absolute bg-black dark:bg-white h-6 w-[0.05rem] top-11 left-5"></div>
          <div className="  rounded-full absolute top-[4.26rem] left-[0.38rem]">
            <DarkMode />
        </div>
      </div>
      <ul className=" flex gap-3 text-sm font-semibold items-center justify-center pr-4">
        {loggedIn ? (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-black dark:bg-[#2563EB]  text-white text-md font-bold h-8 w-fit p-2 rounded-lg duration-200 flex items-center justify-center"
                    : "h-8 w-fit p-2  rounded-lg duration-200 flex items-center justify-center"
                }
                to={"/profile"}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-black dark:bg-[#2563EB] text-white text-md font-bold h-8 w-fit p-2 rounded-lg duration-200 flex items-center justify-cente flex-nowrap"
                    : "h-8 w-fit p-2  rounded-lg duration-200 flex items-center justify-center "
                }
                to={"/manage-links"}
              >
                Manage Links
              </NavLink>
            </li>
            <button
              className="hover:bg-red-500 hover:text-white text-red-500 border border-red-500 rounded-lg duration-200 p-2 flex items-center gap-1"
              onClick={logoutHandler}
            >
              <p>Logout</p> <FiLogOut />{" "}
            </button>
          </>
        ) : (
          <>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "h-9 w-16 flex items-center justify-center rounded-md bg-black dark:bg-[#2563EB] text-white "
                    : "h-9 w-16 flex items-center justify-center rounded-md  dark:text-white"
                }
                to={"/sign-up"}
              >
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "h-9 w-16 flex items-center justify-center rounded-md bg-black dark:bg-[#2563EB] text-white"
                    : "h-9 w-16 flex items-center justify-center rounded-md  dark:text-white"
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
