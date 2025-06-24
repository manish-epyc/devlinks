import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import LeftPreviewMobile from "./LeftPreviewMobile";
import devLinkLogo from "../assets/logo.svg";
import { platforms } from "./GetIconByName";

function PublicProfile() {
  const { profile_link } = useParams();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profile_details")
        .select("details")
        .eq("profile_link", profile_link)
        .single();

      if (error) {
        console.error("Profile not found", error);
      } else {
        setProfileData(data.details);
      }
    };

    fetchProfile();
  }, [profile_link]);

  if (!profileData) {
    return (
      <div className="text-center text-gray-500 mt-20">Loading profile...</div>
    );
  }

  return (
    <div className=" w-full after:bg-blue-600 after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:min-h-[357px] after:z-[-1] after:rounded-b-4xl">
      <div className="relative max-w-[1280px] mx-auto pt-6">
        <header className="bg-white p-4 md:px-8 md:py-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl mb-6">
          <div className="flex items-center">
            <Link to={"/"}>
              <img
                src={devLinkLogo}
                alt="Devlinks Logo"
                className="mx-auto h-8"
              />
            </Link>
          </div>

          <Link
            to="/"
            className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 transition duration-200 text-center w-full md:w-auto"
          >
            Login
          </Link>
        </header>

        <div className="pt-20">
          <div>
            <LeftPreviewMobile
              profile={profileData}
              links={profileData.links}
              platforms={platforms}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
