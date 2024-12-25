import React, { useState } from "react";
import { useCollapse } from "react-collapsed";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { supabase } from "../../../supabase/config";
import { FaPaw } from "react-icons/fa";
function AddCustomURL() {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
  const [title, setTitle] = useState();
  const [url, setUrl] = useState();
  const [icon, setIcon] = useState(null);
  const [success, setSucces] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();
    let iconUrl = null; //for storing uploaded icon
    // fetching user
    const { data: user, error } = await supabase.auth.getUser();
    console.log(user.user.id);
    // IconUpload
    if (icon) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("link_Images")
        .upload(`user-${user.user.id}/${Date.now()}-${icon.name}`, icon, {
          upsert: true,
        });
      // icon upload error handle
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        alert("Failed to upload icon. Please try again.");
        return;
      }

      // fetching the public URL of the uploaded icon
      const { data: publicUrlData } = supabase.storage
        .from("link_Images")
        .getPublicUrl(`user-${user.user.id}/${icon.name}`);

      iconUrl = publicUrlData.publicUrl;
    }
    // if icon not uploaded then set the deafult icon url
    else {
      iconUrl =
        "https://hxgwraleluvyyhyegiwu.supabase.co/storage/v1/object/public/link_Images/defaultFiles/link.png";
    }
    //uploading the link to the table
    if (title && url) {
      const { data, error } = await supabase.from("links").insert([
        {
          link_name: title,
          link_url: url,
          image: iconUrl,
          user_id: user.user.id,
          username: user.user.user_metadata.username,
          full_name: user.user.user_metadata.display_name,
        },
      ]);
      // after then clear the input boxes
      setSucces(true);
      setTitle("");
      setUrl("");
      setIcon(null);
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
    <div className=" my-4 border dark:shadow-md select-none dark:shadow-black/35 dark:bg-[#1F2937] border-black/25 rounded-xl ">
      <div
        className="border-1 shadow-xl  dark:border-[#7b8eb5] border-black/15 pl-3 py-4 rounded-xl  "
        {...getToggleProps()}
      >
        <span className="flex items-center justify-between">
          {" "}
          <p className="font-bold text-lg  ">Add Custom Links</p>{" "}
          {isExpanded ? (
            <MdExpandLess className="scale-[2] mr-2" />
          ) : (
            <MdExpandMore className="scale-[2] mr-2" />
          )}
        </span>
      </div>
      <div className="" {...getCollapseProps()}>
        <form onSubmit={submitHandler} className="m-2 ml-4 flex flex-col gap-4">
          <div>
            {" "}
            <label className="flex flex-col p-2 pl-0 font-semibold pb-0 text-[0.8rem] ">
              Title
            </label>
            <input
              className="dark:bg-[#374151] dark:placeholder-[#6B7280]  mt-0 p-2 scroll-mt-0 border w-full border-gray-500 rounded-md focus:outline-none focus:border-gray-300 dark:border-2"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter link title"
            />
          </div>
          <div>
            {" "}
            <label className="flex flex-col p-2 pl-0 font-semibold pb-0 text-[0.8rem] ">
              Custom Icon (optional)
            </label>
            <input
              className="file:rounded-full file:bg-black file:border-none file:active:scale-[0.96] dark:file:bg-[#c6ccdb]  dark:bg-[#475263] dark:placeholder-[#6B7280] mt-0 p-2 scroll-mt-0  w-full  border-gray-500 rounded-md dark:border-2"
              type="file"
              accept="image/*"
              onChange={(e) => setIcon(e.target.files[0])}
              placeholder="Enter link title"
            />
          </div>
          <div>
            {" "}
            <label className="flex flex-col p-2 pb-0 pl-0 font-semibold text-[0.8rem]">
              URL
            </label>
            <input
              className="dark:bg-[#374151] dark:placeholder-[#6B7280]  mt-0 p-2 scroll-mt-0 border w-full border-gray-500 rounded-md focus:outline-none focus:border-gray-300 dark:border-2"
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              placeholder="http://"
            />
          </div>
          <div className="flex items-center">
            <button
              className=" dark:bg-[#2563EB] bg-black rounded-md px-4 w-fit text-white p-2 font-medium text-[0.8rem] m-2"
              type="submit"
            >
              Add Custom Link
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

export default AddCustomURL;
