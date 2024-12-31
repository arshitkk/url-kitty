import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../supabase/config";
import { socials } from "../data/socials";
import DarkMode from "./mini_component/DarkMode";
import { NavLink } from "react-router-dom";

function PublicPage() {
  const [name, setName] = useState();
  const [socialLinks, setSocialLinks] = useState([]);
  const [customLinks, setCustomLinks] = useState([]);
  const [img, setImg] = useState();
  const [loading, setLoading] = useState(true);
  const [socialLinkNotFound, setsocialLinkNotFound] = useState(false);
  const [customLinkNotFound, setcustomLinkNotFound] = useState(false);
  const val = useParams();

  async function fetchLinks() {
    // fetching the whole link table
    let { data: links, error } = await supabase.from("links").select("*");

    if (error) {
      console.error("Error fetching data:", error.message);
      setsocialLinkNotFound(true);
      return;
    }
    // filtering the links of the username
    let SocialFilterLinks = [];
    let customLinkFilterLinks = [];
    let socialsFound = false;
    let customFound = false;
    //looping through the link object array
    for (const link of links) {
      if (link.username == val.username) {
        // fetching Full Name
        if (link.full_name) {
          setName(
            link.full_name
              .split(" ")
              .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
              .join(" ")
          );
        }

        // feching Social Links
        let isSocialLink = false;
        for (const social of socials) {
          if (social === link.link_name) {
            socialsFound = true;

            SocialFilterLinks.push({
              name: link.link_name,
              url: link.link_url,
              icon: link.image,
            });
            isSocialLink = true;
            break;
          }
        }

        // fetching Custom Links
        if (!isSocialLink && link.link_name) {
          customFound = true;
          customLinkFilterLinks.push({
            name: link.link_name,
            url: link.link_url,
            icon: link.image,
          });
        }

        // fetching Profile Picture
        if (link.profile_url) {
          setImg(link.profile_url);
        }
      }
    }
    // handling not found situations
    if (!socialsFound) {
      setsocialLinkNotFound(true);
    }
    if (!customFound) {
      setcustomLinkNotFound(true);
    }
    // if found links, store the links to the states
    setSocialLinks(SocialFilterLinks);
    setCustomLinks(customLinkFilterLinks);
  }
  // fetching links whenever param changes
  useEffect(() => {
    fetchLinks();
  }, [val]);
  useEffect(() => {
    // Simulate a data fetch for a little delay
    const timer = setTimeout(() => {
      setLoading(false); // Mark as loaded after fetching
    }, 1000); // Adjust delay as per your actual fetch time

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) {
    // Show a loading spinner or placeholder
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
  //show if no page found
  if (!name) {
    // Show error message only when `name` is truly unavailable
    return (
      <div className="h-screen translate-y-[-11rem] duration-500 dark:text-white  flex flex-col items-center justify-center">
        <div className="flex-col flex items-center justify-center p-11 ">
          <div className="  bg-contain bg-no-repeat dark:bg-[url('Logo-dark.svg')] bg-[url('Logo.svg')] h-96 w-96 duration-500 translate-y-28"></div>
          <p className="p-10 m-10 text-4xl font-bold">
            Could not Find the Page, Either the owner didn't setup any links or
            the custom page doesnt exists
          </p>{" "}
          <span className="flex justify-center items-center gap-3">
            <p className="font-semibold text-xl">
              Create Your Own Custom Link Page Now! for FREE!
            </p>
            <button className="bg-black text-white font-medium rounded-md p-4 px-8">
              <a href="">URL-KITTY</a>
            </button>
          </span>
        </div>
      </div>
    );
  }

  // Render the actual content if `name` is found
  return (
    <div className="w-screen ">
      <div className="min-h-screen w-screen duration-500 dark:text-white ">
        <div>
          <div className="shadow-xl absolute bg-black dark:bg-white h-[4.3rem] w-[0.05rem] top-0 left-5"></div>
          <div className="  rounded-full absolute top-[4.26rem] left-[0.38rem]">
            <DarkMode />
          </div>

          <div className="  w-full h-fit py-9 flex flex-col items-center ">
            <div className="border-2 border-black/20 shadow-lg p-[0.3rem] rounded-full">
              {" "}
              <img
                className={` w-28 h-28 object-cover rounded-full `}
                src={img}
              />
            </div>
            <h1 className="text-3xl font-bold drop-shadow-lg mt-3 p-1">
              {" "}
              {name}
            </h1>
          </div>
          <div className="flex flex-col gap-9">
            {/* Social Links */}
            {socialLinkNotFound ? null : (
              <div>
                <div className="gap-2 flex flex-col items-center text-2xl font-semibold">
                  <h1>Social Links </h1>
                  <div className="dark:bg-white bg-black h-[0.32rem] w-20 rounded-full"></div>
                </div>
                <ul className="flex flex-wrap gap-7 justify-center mt-3 ">
                  {socialLinks.map((link, index) => {
                    console.log(link);
                    return (
                      <li
                        className="hover:scale-[1.3] duration-300 w-12 max-h-12 border rounded-xl p-[0.2rem] border-black/20 shadow-xl bg-white/40"
                        key={index}
                      >
                        <a href={link.url} target="_blank">
                          <img
                            className=" rounded-lg bg-white p-[0.2rem]"
                            src={`${link.icon}`}
                            alt={link.name}
                          />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {/* Custom Links */}
            {customLinkNotFound ? null : (
              <div className=" py-3 mx-16 flex flex-col items-center">
                <div className="gap-2 flex flex-col  items-center text-2xl font-semibold">
                  <h1>Custom Links </h1>
                  <div className="dark:bg-white bg-black h-[0.32rem] w-20 rounded-full"></div>
                </div>
                <ul
                  className={`mt-8 h-full w-fit grid gap-y-5 gap-x-11 place-items-center grid-cols-1 md:grid-cols-2`}
                  // className={` flex gap-x-3 gap-y-5 justify-center mt-5 flex-wrap `}
                >
                  {customLinks.map((link, index) => {
                    console.log("custom", link);
                    return (
                      <li
                        className={`border-gray-800 h-fit w-80  text-lg  mx-6 rounded-lg p-[0.3rem] border shadow-xl  dark:bg-[#1F2937] hover:scale-[1.08] duration-200 `}
                        key={index}
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          className={` h-full w-full `}
                        >
                          <div className=" h-full flex items-center justify-start gap-4">
                            {" "}
                            <img
                              className="rounded-lg h-12 w-12 object-cover border-2 dark:border-none"
                              src={`${
                                link.icon
                                  ? link.icon
                                  : "https://thumbs.dreamstime.com/b/chain-link-icon-vector-illustration-white-background-152617478.jpg"
                              }`}
                              alt={link.name}
                            />
                            <p className=" font-medium break-words ">
                              {link.name}
                            </p>
                          </div>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-screen flex flex-col items-center text-gray-500 dark:text-gray-300 text-sm mt-20 gap-2 border-t border-black dark:border-[#1a2847] overflow-hidden">
        {/* Footer Section */}
        <p className="mt-4 flex items-end gap-2">
          Created with{" "}
          <a href="#" className="font-bold">
            <NavLink to={"/"}>
              <div className="bg-contain bg-no-repeat dark:bg-[url('/Logo-dark.svg')] bg-[url('/Logo.svg')] h-20 w-20 translate-y-[1rem]"></div>
            </NavLink>
          </a>
        </p>
        <p className="mb-5 text-center">
          Create your own custom Page Now!- Go to{" "}
          <a href="#" className="font-bold text-black dark:text-white">
            URL-KITTY
          </a>
        </p>
      </div>
    </div>
  );
}

export default PublicPage;
