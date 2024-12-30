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
  const [addLinkLoader, setaddLinkLoader] = useState(false);
  const [placeholder, setPlaceholder] = useState("http://");
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  async function submitHandler(e) {
    e.preventDefault();
    setaddLinkLoader(true);
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
      setaddLinkLoader(false);
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
              onChange={(e) => {
                const selectedValue = e.target.value;
                setPlatform(selectedValue)
                selectedValue == 'Gmail'
                  ? setPlaceholder("mailto:example@gmail.com")
                  : setPlaceholder("http://")
              }}
               // Update platform with selected value
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
              placeholder={placeholder}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button
              className="font-medium  dark:bg-[#2563EB] bg-black rounded-md px-4 w-32 h-9 text-white p-2 text-[0.8rem] m-2"
              type="submit"
            >
              {addLinkLoader ? (
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
                "Add Social Link"
              )}
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
