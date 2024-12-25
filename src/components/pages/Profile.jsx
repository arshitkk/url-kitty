import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase/config"; // Import supabase client
import Avatar from "./mini_component/Avatar";
import AddSocialLink from "./mini_component/AddSocialLink";
import AddCustomURL from "./mini_component/AddCustomURL";
import RecentLinks from "./mini_component/RecentLinks";

function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

// check user logged in or not
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setLoggedIn(true);
        setDisplayName(user.user_metadata.display_name);
        console.log("Logged In", user.user_metadata.display_name);
      } else {
        setLoggedIn(false);
        console.log("Logged Out");
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
        </div>
      </div>
      <AddSocialLink />
      <AddCustomURL />
      <RecentLinks />
    </div>
  ) : null;
}

export default Profile;
