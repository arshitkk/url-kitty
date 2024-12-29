import React, { useEffect, useState } from "react";
import { supabase } from "../../../supabase/config";

function RecentLinks() {
  const [recentLinks, setRecentLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  // fetching recent links
  useEffect(() => {
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
          setRecentLinks(filteredLinks);
        } else {
          console.error("Error fetching links:", error);
        }
      }
      setLoading(false);
    }

    fetchRecentLinks();

    // Subscribe to the real-time changes (insertions) in the 'links' table
    const channel = supabase
      .channel("links")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
        },
        (payload) => {
          setRecentLinks((prevLinks) => [...prevLinks, payload.new]);
        }
      )
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="rounded-sm p-3">
      <div className="flex flex-col items-center">
        <p className="font-bold text-lg">Recently Added Links</p>
        <div className="bg-black dark:bg-white h-[0.3rem] w-52 rounded-full"></div>
      </div>
      {!loading ? (
        <ul className="flex flex-col gap-5 justify-center mt-5">
          {recentLinks.toReversed().map((link, index) => {
            if (index < 5) {
              return (
                <li
                  key={index}
                  className="dark:bg-[#1f293799] h-full w-full rounded-lg p-[0.3rem] border dark:border-[#303f5c] dark:shadow-2xl shadow-md hover:scale-[1.02] duration-200 "
                >
                  <a href={link.link_url} className="h-full w-full">
                    <div className="flex items-center justify-start gap-2">
                      <div className="bg-white/30 p-[0.2rem] rounded-lg">
                        <img
                          className="rounded-lg w-9 h-9 object-cover bg-white p-[0.2rem]"
                          src={`${link.image}`}
                          alt={link.link_name}
                        />
                      </div>
                      <div className="pl-3">
                        <p className="font-medium break-words">
                          {link.link_name}
                        </p>
                        <p className="text-gray-400 text-sm break-words">
                          {link.link_url}
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <div className="flex justify-center items-center mt-5 w-full h-full">
          <div role="status">
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
      )}
    </div>
  );
}

export default RecentLinks;
