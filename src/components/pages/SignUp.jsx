import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../../supabase/authLogin";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  const [emailExist, setEmailExist] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  const [loginLoader, setLoginLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (info) => {
    // Check if the username already exists in the database
    setLoginLoader(true);
    const { data: usernameData, error: usernameError } = await supabase
      .from("links")
      .select("username")
      .eq("username", info.username)
      .single(); // To fetch a single record
    if (usernameData) {
      console.log(usernameData);
      setUsernameExist(true);
      setSuccess(false);
    } else {
      console.log(usernameData);
      setUsernameExist(false);
    }
    // Check if the email already exists in the database
    const { data: emailData, error: emailError } = await supabase
      .from("links") // Assuming you have a table "users"
      .select("email")
      .eq("email", info.email)
      .single();

    if (emailData) {
      setEmailExist(true);
      setSuccess(false);
    } else {
      setEmailExist(false);
    }
    // If either username or email already exists, show an error

    // Proceed with the signup if no errors
    if (!usernameData && !emailData) {
      const { data, error } = await signUp(
        info.email,
        info.password,
        info.fullName,
        info.username
      );
      if (error) {
        alert(error.message); // Show any other errors
        console.log(data, error);
      } else {
        console.log("User signed up successfully!", data);
        setSuccess(true);
        setLoginLoader(false);
      }
    }
  };

  return (
    <div className="dark:text-[#FFFFFF] flex flex-col items-center mt-14">
      <div className="border rounded-xl scale-[0.88] sm:scale-100 border-black/10 shadow-xl p-6 dark:bg-[#1F2937]">
        <div className="flex flex-col items-center mb-12 gap-2">
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <span className="text-[0.8rem] flex gap-1">
            <p className="text-[#4B5563] dark:text-[#D1D5DB]">
              Already have an account?
            </p>
            <Link to={"/Login"} className="font-bold">
              Login
            </Link>
          </span>
        </div>

        <form
          className="flex flex-col w-80 gap-2"
          onSubmit={handleSubmit(onSubmit)} // Handle form submission
        >
          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Full Name
            <input
              className="dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900"
              type="text"
              {...register("fullName", { required: "Full name is required" })}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.fullName.message}
              </p>
            )}
          </label>

          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Username
            <input
              className="dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900"
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
              onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
            />
            {errors.username && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.username.message}
                {}
              </p>
            )}
            {usernameExist === true && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                Username already Exist
              </p>
            )}
          </label>

          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Email address
            <input
              className="dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.email.message} {emailExist ? "Email already Exist" : ""}
              </p>
            )}
            {emailExist === true && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                Email already Exist
              </p>
            )}
          </label>

          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Password
            <div className="w-full flex items-center">
              <input
                className="w-full dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900"
                type={showPass ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must have at least 8 characters, one number, one uppercase, one lowercase, and one special character",
                  },
                })}
                placeholder="Enter your password"
              />
              {showPass ? (
                <FaEye
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-[2rem] cursor-pointer text-[1.06rem]"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-[2rem] cursor-pointer text-[1.06rem]"
                />
              )}
            </div>
            {errors.password && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.password.message}
              </p>
            )}
          </label>

          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Confirm Password
            <div className="w-full flex items-center">
              <input
                className="w-full dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900"
                type={showPass ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                placeholder="Confirm your password"
              />
              {showPass ? (
                <FaEye
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-[2rem] cursor-pointer text-[1.06rem]"
                />
              ) : (
                <FaEyeSlash
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-[2rem] cursor-pointer text-[1.06rem]"
                />
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </label>

          <button
            className="bg-black dark:bg-[#2563EB] rounded-md text-white p-2 text-[0.8rem] mb-5"
            type="submit"
          >
            {loginLoader ? (
              <div
                className="flex items-center justify-center w-full "
                role="status"
              >
                <svg
                  aria-hidden="true"
                  className=" w-4 text-gray-200 animate-spin dark:text-gray-400 fill-black"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="flex items-center justify-center">
          {success && (
            <p className=" text-green-600 dark:text-green-400 text-center w-56 duration-300">
              Go to the your mail app (eg. Gmail) to confirm your e-Mail
            </p>
          )}
        </div>
      </div>

      <span className="text-[0.8rem] flex gap-1 mt-4">
        <p className="text-[#4B5563] dark:text-[#9CA3AF] ">Need Help?</p>
        <a className="font-bold" href="mailto:arshitkumar222@gmail.com">
          Contact Me
        </a>
      </span>
    </div>
  );
}

export default SignUp;
