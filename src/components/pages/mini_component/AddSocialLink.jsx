import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { socials } from "../../data/socials";
import { socialIcons } from "../../data/socialIcons";
import { supabase } from "../../../supabase/config";
import { FaPaw } from "react-icons/fa";
function AddSocialLink() {
  const [platform, setPlatform] = useState("");
  const [link, setLink] = useState();
  const [success, setSucces] = useState(false);

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  async function submitHandler(e) {
    e.preventDefault();

    let iconUrl = null; //for storing uploaded icon
    // setting the relevent social media icon url by looping throught the custom socialIcon array
    for (const icon of socialIcons) {
      if (platform == icon.name) {
        iconUrl = icon.icon;
      }
    }

    //uploading the link to the table
    const { data: user, error } = await supabase.auth.getUser();
    if (platform && link) {
      const { data, error } = await supabase.from("links").insert([
        {
          link_name: platform,
          link_url: link,
          image: iconUrl,
          user_id: user.user.id,
          username: user.user.user_metadata.username,
          full_name: user.user.user_metadata.display_name,
        },
      ]);
      // after then clear the input boxes
      setSucces(true);
      setLink("");
      setPlatform("");
      //set the success back to the false for showing success message for a short time (1.5sec)
      setTimeout(() => {
        setSucces(false);
      }, 1500);
      //if empty fields then
    } else {
      alert("WRITE SOMETHING");
    }
  }
  return (
    <div className="dark:shadow-md dark:shadow-black/35 select-none  dark:bg-[#1F2937] duration-500 border border-black/25 rounded-xl ">
      <div
        className="border  shadow-xl  border-black/15 pl-3 py-4 rounded-xl  "
        {...getToggleProps()}
      >
        <span className="flex items-center justify-between">
          {" "}
          <p className="font-bold text-lg">Add Social Links</p>{" "}
          {isExpanded ? (
            <MdExpandLess className="scale-[2] mr-2" />
          ) : (
            <MdExpandMore className="scale-[2] mr-2" />
          )}
        </span>
      </div>
      <div className="" {...getCollapseProps()}>
        <form
          onSubmit={submitHandler}
          className=" m-2 ml-4 flex flex-col gap-4"
        >
          <div>
            {" "}
            <label className="flex flex-col p-2 pl-0 font-semibold pb-0 text-[0.8rem] ">
              Platform
            </label>
            <select
              className="dark:bg-[#374151] dark:placeholder-[#6B7280]  mt-0 p-2 scroll-mt-0 border w-full border-gray-500 rounded-md focus:outline-none focus:border-gray-300 dark:border-2"
              name="select-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)} // Update platform with selected value
            >
              <option className="" value="" disabled>
                --Select platform--
              </option>
              {socials.map((social, index) => (
                <option
                  className=" duration-500 dark:bg-black/5 dark:text-white"
                  key={index}
                  value={social}
                >
                  {social}
                </option>
              ))}
            </select>
          </div>
          <div>
            {" "}
            <label className="flex flex-col p-2 pb-0 pl-0 font-semibold text-[0.8rem]">
              URL
            </label>
            <input
              value={link}
              className="dark:bg-[#374151] dark:placeholder-[#6B7280]  mt-0 p-2 scroll-mt-0 border w-full border-gray-500 rounded-md focus:outline-none focus:border-gray-300 dark:border-2"
              type="text"
              placeholder="http://"
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button
              className="font-medium  dark:bg-[#2563EB] bg-black rounded-md px-4 w-fit text-white p-2 text-[0.8rem] m-2"
              type="submit"
            >
              Add Link
            </button>
            {success ? (
              <>
                {" "}
                <p className=" duration-100 text-sm font-semibold text-green-600">
                  Link Added Succesfully{" "}
                </p>
                <FaPaw className="ml-1 duration-100 text-green-600" />
              </>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSocialLink;
