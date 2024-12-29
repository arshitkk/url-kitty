import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { supabase } from "../../../supabase/config";
function Avatar() {
  let pfp;
  const [loading, setLoading] = useState(false);
  const [pfpUrl, setPfpUrl] = useState();
  const [prevPfpUrl, setPrevPfpUrl] = useState(null);
  const fetchingPfpUrl = async () => {
    // fetching user
    const { data: user, error: userError } = await supabase.auth.getUser();
    // fetching username
    const username = user.user.user_metadata?.username;
    const { data, error } = await supabase
      .from("links")
      .select("profile_url, username")
      .eq("username", username)
   
    //it'll return the profile url and username only if usernames matches with the user

    if (error) {
      console.error("Error fetching profile URL:", error.message);
      return;
    } 
    if (data) {
      for (const d of data) {
        if (d.profile_url !=null) {
          setPfpUrl(d.profile_url); // Set the profile URL
          setPrevPfpUrl(d.profile_url); // Set the previous profile URL to delete whenever new profile picture set
        }
      }
      console.log("img", pfpUrl);
    }
  };

  useEffect(() => {
    fetchingPfpUrl();
  });
  const handlePfpChange = async (e) => {
    e.preventDefault();
    pfp = e.target.files[0];
    setLoading(true);
    try {
      //Deleting Previous Pfp
      if (prevPfpUrl) {
        const publicBaseUrl =
          "https://hxgwraleluvyyhyegiwu.supabase.co/storage/v1/object/public/link_Images/";
        const filePath = prevPfpUrl.replace(publicBaseUrl, "");
        const { error: deleteError } = await supabase.storage
          .from("link_Images")
          .remove([filePath]);

        if (deleteError) {
          console.error(
            "Error deleting previous profile picture:",
            deleteError.message
          );
        }
      }
      //Uploading New Pfp
      const { data: user, error: userError } = await supabase.auth.getUser();

      if (pfp) {
        const { data: pfpData, error } = await supabase.storage
          .from("link_Images")
          .upload(`user-${user.user.id}/${pfp.name}`, pfp);
        //getting the public Url
        const { data: pfpUrlData } = supabase.storage
          .from("link_Images")
          .getPublicUrl(`user-${user.user.id}/${pfp.name}`);
        if (pfpUrlData?.publicUrl) {
          setPfpUrl(pfpUrlData.publicUrl);
          setPrevPfpUrl(pfpUrlData.publicUrl);
        }
        // updating profile_url column
        if (pfpUrlData?.publicUrl) {
          const { error: updateError } = await supabase
            .from("links")
            .update({ profile_url: pfpUrlData.publicUrl })
            .eq("user_id", user.user.id);
          if (updateError)
            console.error("Error updating profile URL:", updateError.message);
        }
      }
    } catch (error) {
      console.error("Unexpected error occurred", error.message);
    } finally {
      setLoading(false); // Stop the loader animation no matter what
    }
  };
  return (
    <div>
      {loading === true ? (
        <div className={`m-0 shadow-xl w-24 h-24 object-cover rounded-full  `}>
          <div
            className="flex items-center justify-center w-full h-full "
            role="status"
          >
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-400 fill-black"
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
        </div>
      ) : (
        <img
          className={`shadow-xl w-24 h-24 object-cover rounded-full border-2 dark:border-white  border-black `}
          src={`${pfpUrl}`}
        />
      )}
      <label htmlFor="file-input">
        <MdEdit className="  cursor-pointer dark:border-2 dark:border-black text-white bg-black dark:bg-white dark:text-black w-7 h-7 p-1 rounded-full relative bottom-[1.6rem] left-[4.3rem]" />
      </label>
      <input
        accept="image/*"
        onChange={handlePfpChange}
        type="file"
        id="file-input"
        hidden
      />
    </div>
  );
}

export default Avatar;
