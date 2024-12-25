import React from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
function LandingPage() {
  return (
    <>
      <div className="dark:text-white text-[0.7rem] sm:text-[1rem] flex flex-col items-center flex-grow my-3 gap-9 sm:gap-16 mb-32 duration-500">
        <div className=" bg-contain bg-no-repeat dark:bg-[url('/Logo-dark.svg')] bg-[url('/Logo.svg')] h-36 w-40  flex sm:w-44 p-0 "></div>
        <div className="flex flex-col justify-center items-center max-w-[50rem] w-full px-4">
          <h1 className=" flex text-4xl sm:text-5xl font-bold text-center">
            Welcome to{" "}
            <p className="pl-2 underline animate-bounce duration-400">
              UrlKitty!
            </p>
          </h1>
          <p className="dark:opacity-60 text-center dark:text-white text-[#4B5563] mt-3">
            The easiest way to organize and share all your links in one place.
            Whether it's for your personal portfolio, social media, or business
            links, UrlKitty makes it simple and stylish!
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-3 mb-28 sm:mb-0">
          <Link
            to={"/sign-up"}
            className="bg-black dark:bg-[#2563EB] text-white font-medium rounded-md text-sm p-4 px-8 "
          >
            Get Started - it's Free
          </Link>
          <span className="text-[0.8rem] flex gap-1">
            <p className="dark:opacity-60 dark:text-white text-[#4B5563]">
              Already have an account?
            </p>{" "}
            <Link to={"/login"} className="font-bold">
              Login
            </Link>
          </span>
        </div>
        <div className="flex flex-col justify-center items-center max-w-[50rem] w-full px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            Create Your Link Hub Today
          </h1>
          <div className="dark:bg-white bg-black sm:h-[0.32rem] h-[0.25rem] w-64  sm:w-80 mt-1 mb-1 sm:mt-2 sm:mb-2 rounded-full"></div>
          <p className="dark:text-white text-center text-[#4B5563] mt-2 dark:opacity-60">
            With UrlKitty, you can build a customized link tree that represents
            you or your brand. Add your favorite links, and share them
            effortlessly. No fuss, just convenience.
          </p>
        </div>
        <div className="flex flex-col items-center mt-11">
          <h1 className="text-2xl sm:text-3xl font-bold ">
            Why Choose UrlKitty?
          </h1>
          <div className="dark:bg-white bg-black sm:h-[0.32rem] h-[0.22rem] w-44  sm:w-64 mt-1 mb-1 sm:mt-2 sm:mb-2 rounded-full"></div>
          <div className="flex flex-wrap gap-8 justify-center  px-4 mt-4  ">
            <div className="rounded-xl shadow-xl border-2 h-56 sm:h-64 w-72 p-4  flex flex-col justify-center gap-5 items-center duration-200 hover:scale-105 dark:border-[#3e5074] dark:bg-[#1F2937]">
              <h1 className="text-xl font-bold text-center">
                Create Multiple Links in One Place
              </h1>
              <p className="dark:text-white text-[#474747] dark:opacity-60 text-center">
                URL Kitty lets you organize and share multiple links through a
                single, easy-to-access page. Ideal for social media bios,
                portfolios, or personal websites.
              </p>
            </div>
            <div className="rounded-xl shadow-xl border-2 h-56 sm:h-64 w-72 p-4 flex flex-col justify-center gap-5 items-center duration-200 hover:scale-105 dark:border-[#3e5074] dark:bg-[#1F2937]">
              <h1 className="text-xl font-bold text-center">
                Simple and Clean Design
              </h1>
              <p className="text-[#474747] dark:text-white dark:opacity-60 text-center">
                URL Kitty offers a straightforward, minimalistic layout that
                puts your links front and center, making it easy for visitors to
                navigate.
              </p>
            </div>
            <div className="rounded-xl shadow-xl border-2 h-56 sm:h-64 w-72 p-4 flex flex-col justify-center gap-5 items-center duration-200 hover:scale-105 dark:border-[#3e5074] dark:bg-[#1F2937] ">
              <h1 className="text-xl font-bold text-center">
                Completely Free and Open Source
              </h1>
              <p className="text-[#474747] dark:text-white dark:opacity-60 text-center">
                URL Kitty is 100% free and open source. There are no hidden fees
                or premium tiers – enjoy unlimited links and full control
                without paying a dime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
