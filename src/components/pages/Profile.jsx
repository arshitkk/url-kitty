import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/config"; // Import supabase client
import Avatar from "./mini_component/Avatar";
import AddSocialLink from "./mini_component/AddSocialLink";
import AddCustomURL from "./mini_component/AddCustomURL";
import RecentLinks from "./mini_component/RecentLinks";
import { BsBoxArrowUpRight } from "react-icons/bs";
function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");

  // check user logged in or not
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setLoggedIn(true);
          setDisplayName(user.user_metadata.display_name);
          setUsername(user.user_metadata.username);
          console.log("Logged In", user.user_metadata.display_name, user);

          // Check if the user already exists in the database
          const { data: existingUser, error: checkError } = await supabase
            .from("links")
            .select("*")
            .match({ user_id: user.id });

          if (checkError) {
            console.error("Error checking user profile:", checkError.message);
          } else if (existingUser.length === 0) {
            // If it's the first time login, insert default data
            const { username, email, display_name } = user.user_metadata;
            const { error: insertError } = await supabase.from("links").insert([
              {
                user_id: user.id,
                username: username,
                email: email,
                full_name: display_name,
                profile_url:
                  "https://hxgwraleluvyyhyegiwu.supabase.co/storage/v1/object/public/link_Images/defaultFiles/link.png",
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
        } else {
          setLoggedIn(false);
          console.log("Logged Out");
        }
      } catch (error) {
        console.error("Unexpected error:", error.message);
      }
    };

    fetchUser();
  }, []);

  return loggedIn ? (
    <div className="pl-2 m-5 mt-16  dark:text-white">
      <div className="dark:bg-[#141d2f] mb-3 p-2 rounded-xl shadow-lg">
        {/* Profile Section */}
        <div>
          <h1 className="font-bold text-xl ">Profile</h1>
          <p className="text-[#4B5563] dark:text-[#a8b0c0] text-sm ">
            Customize your profile and manage your links
          </p>
        </div>
        <div className="w-full h-fit py-9 flex flex-col items-center ">
          <Avatar />
          <h1 className="text-2xl translate-y-[-1.3rem] font-bold">
            {displayName
              .split(" ")
              .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
              .join(" ")}
          </h1>
          <div className=" w-fit relative transition-all duration-300 group flex flex-col items-center justify-center  ">
            <p className="text-start w-full text-[0.65rem]">
              your publlic page:
            </p>
            <a
              href={`https://url-kitty.vercel.app/${username}`}
              target="_blank"
              className="cursor-pointer w-fit flex items-center justify-center gap-1 font-semibold border-2 border-black dark:border-white p-1 rounded-xl "
            >
              <p>url-kitty/{username}</p>
              <BsBoxArrowUpRight />
            </a>
            <p className=" w-fit absolute text-sm h-fit top-[-1.8rem] shadow-lg shadow-black bg-green-400 text-black p-1 rounded-md duration-500 opacity-0 group-hover:opacity-100 font-semibold">
              https://url&#8209;kitty.vercel.app/{username}
            </p>
          </div>
        </div>
      </div>
      <AddSocialLink />
      <AddCustomURL />
      <RecentLinks />
    </div>
  ) : null;
}

export default Profile;
