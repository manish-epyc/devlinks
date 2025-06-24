import { useFormData } from "../context/FormDataContext";
import LeftPreviewMobile from "./LeftPreviewMobile";
import { Link } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../lib/supabaseClient";
import { useAuthData } from "../context/AuthContext";
import { useState } from "react";
import { platforms } from "./GetIconByName";

async function saveProfile(profile, links, userId) {
  const profileLink = uuidv4();

  const { error } = await supabase.from("profile_details").insert([
    {
      user_id: userId,
      profile_link: profileLink,
      details: {
        ...profile,
        links: links.map(({ id, platform, url }) => ({ id, platform, url })),
      },
    },
  ]);

  if (error) {
    console.error("Error saving profile:", error);
    return null;
  }

  return profileLink;
}

async function handleSaveProfile(profile, links, user, handleShowMessage) {
  if (
    profile &&
    typeof profile.firstName === "string" &&
    profile.firstName.trim() !== "" &&
    typeof profile.email === "string" &&
    profile.email.trim() !== "" &&
    Array.isArray(links) &&
    links.length > 0 &&
    user
  ) {
    const profileLink = await saveProfile(profile, links, user.id);
    if (profileLink) {
      const fullUrl = `${window.location.origin}/profile/${profileLink}`;
      console.log("Profile link:", fullUrl);

      await navigator.clipboard.writeText(fullUrl);
      // alert("Profile link copied to clipboard!");
      handleShowMessage(true);

      setTimeout(() => {
        handleShowMessage(false);
      }, 2000);
    }
  } else {
    console.log("Profile data is empty");
  }
}

function Preview() {
  const { profile, links } = useFormData();
  const { user } = useAuthData();
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = (bool) => {
    setShowMessage(bool);
  };

  return (
    <>
      <div className=" w-full after:bg-blue-600 after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:min-h-[357px] after:z-[-1] after:rounded-b-4xl">
        <div className="relative max-w-[1280px] mx-auto pt-6">
          <header className="bg-white p-4 md:px-8 md:py-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl mb-6">
            <Link
              to="/link"
              className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 transition duration-200 text-center w-full md:w-auto"
            >
              Back to editor
            </Link>

            <div
              className="border bg-purple-600 text-white font-semibold py-2.5 rounded-md hover:bg-purple-50 hover:text-purple-600 transition duration-200 px-8 flex justify-end cursor-pointer"
              onClick={() => {
                handleSaveProfile(profile, links, user, handleShowMessage);
              }}
            >
              Share Link
            </div>
          </header>

          <div className="pt-20">
            <div>
              <LeftPreviewMobile
                links={links}
                profile={profile}
                platforms={platforms}
              />
            </div>
          </div>
        </div>

        {showMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-4 rounded-lg bg-zinc-800 text-white text-sm shadow-lg animate-fade-in-out z-50">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-.758l3.65-3.65M11.318 12.71a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101m.758.758l-3.65 3.65"
              ></path>
            </svg>
            <span>The link has been copied to your clipboard!</span>
          </div>
        )}
      </div>
    </>
  );
}
export default Preview;
