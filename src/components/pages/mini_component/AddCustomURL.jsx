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
    const [addLinkLoader, setaddLinkLoader] = useState(false);
  

  async function submitHandler(e) {
    setaddLinkLoader(true)
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
      setaddLinkLoader(false)
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
              className=" dark:bg-[#2563EB] bg-black rounded-md px-4 w-36 text-white h-9 p-2 font-medium text-[0.8rem] m-2"
              type="submit"
            >
              {addLinkLoader ? <div
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
            </div> :'Add Custom Link'}
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
