import React from "react";
import { supabase } from "../../supabase/config";
import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import { socialIcons } from "../data/socialIcons";
function ManageLinks() {
  const [links, setLinks] = useState([]);
  const [id, setId] = useState(5);
  const [loading, setLoading] = useState(false);
  const [editRowId, setEditRowId] = useState("");
  const [updatedNameValue, setUpdatedNameValue] = useState("");
  const [updatedUrlValue, setUpdatedUrlValue] = useState("");
  const [icon, setIcon] = useState(null);
  const [iconUrl, setIconUrl] = useState();
  //date conversion
  function getDate(input) {
    const date = new Date(`${input}`).toLocaleString();
    return date.toString();
  }
  // fetching recent links
  async function fetchRecentLinks() {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: links, error } = await supabase.from("links").select("*");
      if (links) {
        const filteredLinks = links.filter(
          (link) =>
            link.username === user.user_metadata.username && link.link_name
        );
        setLinks(filteredLinks);
      } else {
        console.error("Error fetching links:", error);
      }
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchRecentLinks();
  }, []);

  //setting edit mode
  function editModeHandler(link) {
    setEditRowId(link.id);
    setIconUrl(link.image);
    setUpdatedNameValue(link.link_name);
    setUpdatedUrlValue(link.link_url);
    console.log("yahan dekh mc ->", iconUrl);
  }

  // Delete Row
  async function deleteRow(value) {
    if (!window.confirm("Are you sure you want to delete this link?")) return;
    const { error } = await supabase.from("links").delete().eq("id", value);
    if (error) {
      console.error("Error deleting row:", error.message);
    } else {
      console.log(`Row with id ${value} successfully deleted!`);
      fetchRecentLinks();
    }
  }

  // update row
  async function updateRow(value) {
    console.log("start");
    let url = "";
    let found = false;

    // setting socialicons from our custom socialIcons sarray if the title name matches icon
    for (const icon of socialIcons) {
      if (icon.name === updatedNameValue) {
        console.log(`${icon.name} -> ${updatedNameValue}`);
        url = icon.icon;
        found = true;
        break; // Exit loop once found
      }
    }
    // Upload logic if no match was found
    let finalIconUrl = url;
    if (!found) {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error fetching user:", userError);
        return;
      }

      if (icon) {
        // Check if 'icon' is defined and valid
        const fileName = `user-${user.id}/${Date.now()}-${icon.name}`;

        // Upload the file
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("link_Images")
          .upload(fileName, icon, { upsert: true });

        if (uploadError) {
          console.error("Error uploading file:", uploadError);
          return;
        }

        // Generate the public URL using the uploaded file path
        const { data: publicUrlData, error: publicUrlError } = supabase.storage
          .from("link_Images")
          .getPublicUrl(fileName);

        if (publicUrlError) {
          console.error("Error generating public URL:", publicUrlError);
          return;
        }

        // Set the final icon URL
        finalIconUrl = publicUrlData.publicUrl;
        console.log("Uploaded Icon URL:", publicUrlData.publicUrl);
      } else {
        console.error("Icon not found or invalid.");
      }
    }

    console.log("Final icon URL:", iconUrl);

    // Update row in database
    const { data, error } = await supabase
      .from("links")
      .update({
        link_name: updatedNameValue,
        link_url: updatedUrlValue,
        image: finalIconUrl,
      })
      .eq("id", value)
      .select();

    if (error) {
      console.error("Error updating row:", error);
    } else {
      console.log("Update successful:", data);
      //then fetch the link for updated links
      fetchRecentLinks();
      setEditRowId("");
    }
  }

  return (
    <div className="dark:text-white h-full mx-4 mt-8 p-3">
      <div>
        <h1 className="font-bold text-2xl mb-2">Manage Links</h1>
        <p className="text-gray-500 dark:text-white dark:opacity-70 text-sm">
          View and manage all your shortened links in one place
        </p>
      </div>
      <div className="dark:border-[#202d43] dark:shadow-black/20 rounded-lg border shadow-md mt-8 text-[0.8rem] w-full flex flex-col items-center  ">
        {loading ? (
          <div className="w-full flex flex-col items-center animate-pulse">
            <div className="w-full max-w-4xl">
              <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded col-span-2"></div>
                        <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-scroll sm:overflow-visible w-full rounded-md \">
            {" "}
            <table className=" w-full table-auto rounded-lg overflow-x-scroll ">
              <thead className=" bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="py-3 w-4 px-4 text-left  text-gray-700 dark:text-gray-200">
                    S.No.
                  </th>
                  <th className="py-3 px-4 text-left  text-gray-700 dark:text-gray-200">
                    Icon
                  </th>
                  <th className="py-3 px-4 text-left  text-gray-700 dark:text-gray-200">
                    Link Title
                  </th>
                  <th className="py-3 px-4 text-left  text-gray-700 dark:text-gray-200">
                    Url
                  </th>
                  <th className="py-3 px-4 text-left  text-gray-700 dark:text-gray-200">
                    Created At
                  </th>
                  <th className="py-3 px-4 text-left  text-gray-700 dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {links.map((link, index) => {
                  if (index < id) {
                    return (
                      <tr
                        key={index}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-150"
                      >
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-300">
                          {index + 1}
                        </td>
                        {editRowId != link.id ? (
                          <td className="py-4 px-4">
                            <img
                              className="h-12 w-12 object-cover rounded-lg"
                              src={link.image}
                              alt="Preview"
                            />
                          </td>
                        ) : (
                          <td className="py-4 px-4">
                            <div className="relative">
                              <img
                                className="h-12 w-12 blur-[1px] rounded-md p-1"
                                src={link.image}
                                alt="Preview"
                              />
                              <label
                                htmlFor="file-input"
                                className="absolute top-0 cursor-pointer bg-white/40 border border-black rounded-md flex items-center justify-center h-12 w-12"
                              >
                                <MdEdit className="text-white  bg-black  p-1 h-5 w-5 rounded-full " />
                              </label>
                            </div>
                            <input
                              accept="image/*"
                              type="file"
                              id="file-input"
                              hidden
                              onChange={(e) => setIcon(e.target.files[0])}
                            />
                          </td>
                        )}

                        {editRowId == link.id ? (
                          <td className="  ">
                            <input
                              type="text"
                              value={updatedNameValue}
                              autoFocus
                              onChange={(e) => {
                                setUpdatedNameValue(e.target.value);
                              }}
                              className="dark:bg-[#374151] dark:placeholder-[#6B7280]  p-4 scroll-mt-0 border w-fit border-gray-500 rounded-md focus:outline-none focus:border-gray-300 dark:border-2 "
                            />
                          </td>
                        ) : (
                          <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                            {link.link_name}
                          </td>
                        )}
                        {editRowId == link.id ? (
                          <td>
                            <input
                              type="text"
                              value={updatedUrlValue}
                              onChange={(e) => {
                                setUpdatedUrlValue(e.target.value);
                              }}
                              className="dark:bg-[#374151] dark:placeholder-[#6B7280]   p-4 scroll-mt-0 border border-gray-500 rounded-md focus:outline-none focus:border-gray-300 dark:border-2"
                            />
                          </td>
                        ) : (
                          <td className="py-4 px-4 text-blue-600 dark:text-blue-400">
                            <a href={link.link_url}>{link.link_url}</a>
                          </td>
                        )}
                        <td className="py-4 px-4 text-gray-500 dark:text-gray-400">
                          {getDate(link.created_at)}
                        </td>
                        <td className="py-4 px-4 text-gray-800 dark:text-gray-100">
                          {editRowId == link.id ? (
                            <div className="flex gap-3 p-1">
                              {" "}
                              <button onClick={() => updateRow(link.id)}>
                                <FaRegSave className="text-blue-800" />
                              </button>
                              <button
                                onClick={() => setEditRowId("")}
                                className="text-green-600 scale-[1.09]"
                              >
                                <TiArrowBack />
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-3 p-1">
                              {" "}
                              <button onClick={() => editModeHandler(link)}>
                                <FaRegEdit />
                              </button>
                              <button
                                onClick={() => {
                                  deleteRow(link.id);
                                }}
                                className="text-red-600 scale-[1.09]"
                              >
                                <MdDelete />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
            <p className="text-center sm:hidden animate">
              {" "}
              {"<- scroll to view table content ->"}
            </p>
          </div>
        )}
        {links.length === 0 ? (
          <p className="mt-4 text-red-500">No LInks Were Found</p>
        ) : null}
        {links.length > 5 || id <= links.length ? (
          <button
            onClick={() => setId((prev) => Math.min(prev + 5, links.length))}
            className="m-auto mt-4  px-[3rem] py-[0.3rem] rounded-full border w-fit border-blue-500 text-blue-800 font-bold shadow-blue-500 shadow-sm hover:bg-blue-500 hover:text-white duration-200 active:scale-[0.9]"
          >
            Show More
          </button>
        ) : null}
        <p className="text-red-500 my-3 font-medium animate-pulse duration-75 ">
          {id >= links.length ? "End of List " : null}
        </p>
      </div>
    </div>
  );
}

export default ManageLinks;
