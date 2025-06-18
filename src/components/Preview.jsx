import { useFormData } from "../context/FormDataContext";
import Header from "./Header";
import LeftPreviewMobile from "./LeftPreviewMobile";

import YoutubeIcon from "../assets/youtube.svg";
import GitHubIcon from "../assets/github.svg";
import LinkedinIcon from "../assets/linkedin.svg";
import FacebookIcon from "../assets/facebook.svg";
import { Link } from "react-router";

const platforms = [
  { name: "GitHub", color: "bg-black", icon: GitHubIcon },
  { name: "YouTube", color: "bg-red-600", icon: YoutubeIcon },
  { name: "LinkedIn", color: "bg-blue-600", icon: LinkedinIcon },
  { name: "Facebook", color: "bg-blue-800", icon: FacebookIcon },
];

function Preview() {
  const { profile, links } = useFormData();

  return (
    <>
      <div className=" w-full after:bg-blue-600 after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:min-h-[357px] after:z-[-1] after:rounded-b-4xl">
        <div className="relative max-w-[1280px] mx-auto pt-6">
          <header className="bg-white p-4 md:px-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl mb-6">
            <Link
              to="/link"
              className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 transition duration-200 text-center w-full md:w-auto"
            >
              Share Link
            </Link>

            <Link
              to="/preview"
              className="border bg-purple-600 text-white font-semibold py-2.5 rounded-md hover:bg-purple-50 hover:text-purple-600 transition duration-200 px-8 flex justify-end"
            >
              Share Link
            </Link>
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
      </div>
    </>
  );
}
export default Preview;
