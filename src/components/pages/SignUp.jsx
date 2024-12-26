import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signUp } from "../../supabase/authLogin";
import { supabase } from "../../supabase/config";
import { useNavigate } from "react-router-dom"; // Import Supabase client

function SignUp() {
  const navigate = useNavigate();
  const [emailExist, setEmailExist] = useState(false);
  const [usernameExist, setUsernameExist] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (info) => {
    // Check if the username already exists in the database
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
            <input
              className="dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900"
              type="password"
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
            {errors.password && (
              <p className="text-red-500 text-[0.7rem] mt-1">
                {errors.password.message}
              </p>
            )}
          </label>

          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Confirm Password
            <input
              className="dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900"
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              placeholder="Confirm your password"
            />
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
            Sign Up
          </button>
        </form>
        <div className="flex items-center justify-center">
          {success && (
            <p className=" text-green-600 dark:bg-green-400 text-center w-56 duration-300">
              Go to the you mail app (eg. Gmail) to confirm your e-Mail
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
