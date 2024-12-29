import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../../supabase/authLogin";
import { supabase } from "../../supabase/config";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [invalidCred, setInvalidCred] = useState(null);
  const [loginLoader, setLoginLoader] = useState(false);
  const [credWarning, setCredWarning] = useState(false);
  const [showPass, setShowPass] = useState(false);
  // Function to handle user login and profile URL logic
  const loginHandler = async (e) => {
    e.preventDefault();
    if (email && password) {
      setLoginLoader(true);
      // Call the Supabase logIn function
      const { data, error } = await logIn(email, password);
      if (error) {
        setInvalidCred(error);
        console.error(error);
        setLoginLoader(false);
        setCredWarning(false)
        return;
      }
      else {
         navigate("/profile");
      }

      if (data?.user?.id) {
        try {
          // Check if the user already exists in the database
          const { data: existingUser, error: checkError } = await supabase
            .from("links")
            .select("*")
            .match({ user_id: data.user.id });

          if (checkError) {
            console.error("Error checking user profile:", checkError.message);
          } else if (existingUser.length === 0) {
            // If its first time login , insert  default data
            const { data: user, error: userError } =
              await supabase.auth.getUser();
            const username = user.user.user_metadata?.username;
            const emailaddress = user.user.user_metadata?.email;
            const fullName = user.user.user_metadata.display_name;
            const { error: insertError } = await supabase.from("links").insert([
              {
                user_id: data.user.id,
                username: username,
                email: emailaddress,
                full_name: fullName,

                profile_url:
                  "https://hxgwraleluvyyhyegiwu.supabase.co/storage/v1/object/public/link_Images/defaultFiles/Logo.svg",
              },
            ]);

            if (insertError) {
              console.error(
                "Error inserting new user profile:",
                insertError.message
              );
            } else {
              console.log("New user created with default data");
            }
          }
        } catch (error) {
          console.error("Unexpected error:", error.message);
        } finally {
          console.log("User logged in successfully:", data);
          setLoginLoader(false);
        }
      }
    }
    else {
      setCredWarning(true);
    }
  };

  return (
    <div className="dark:text-[#FFFFFF] h-full w-full flex flex-col items-center mt-14 ">
      <div className="border rounded-lg scale-[0.88] sm:scale-100 border-black/10 shadow-xl p-6 dark:bg-[#1F2937]">
        <div className="flex flex-col items-center mb-12 gap-2  ">
          {" "}
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <span className="text-[0.8rem] flex gap-1">
            <p className="text-[#4B5563] dark:text-[#D1D5DB]">
              Don't have an account?
            </p>{" "}
            <Link to={"/sign-up"} className="font-bold">
              Sign up now
            </Link>
          </span>
        </div>
        <form onSubmit={loginHandler} className="flex flex-col w-80 gap-2 ">
          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Email address
            <input
              className="dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900 "
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your email"
            />
          </label>
          <label className="flex flex-col font-semibold text-[0.8rem] mb-4 dark:text-[#D1D5DB]">
            Password
            <div className="w-full flex items-center">
              <input
                className="w-full dark:text-[#9CA3AF] border dark:bg-[#374151] dark:border-[#374151] border-gray-300 rounded-sm p-2 pl-5 text-[0.7rem] dark:placeholder-[#6B7280] dark:outline-gray-900  "
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
          </label>
          {invalidCred && (
            <p className="text-red-500 text-[0.7rem] ">{invalidCred.message}</p>
          )}
          {credWarning && (
            <p className="text-red-500 text-[0.7rem] ">fill the credentials</p>
          )}
          <button
            className="bg-black dark:bg-[#2563EB] rounded-md text-white p-2 text-[0.8rem] mb-5 h-8 font-semibold"
            type="submit"
          >
            {loginLoader ? <div
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
            </div> : 'Login'}
          </button>
        </form>
        <p></p>
      </div>
      <span className="text-[0.8rem] flex gap-1 mt-4">
        <p className="text-[#4B5563] dark:text-[#9CA3AF]">Need Help?</p>{" "}
        <a className="font-bold" href="mailto:arshitkumar222@gmail.com">
          Contact Me
        </a>
      </span>
    </div>
  );
}

export default Login;
