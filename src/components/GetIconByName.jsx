import YoutubeIcon from "../assets/youtube.svg";
import GitHubIcon from "../assets/github.svg";
import LinkedinIcon from "../assets/linkedin.svg";
import FacebookIcon from "../assets/facebook.svg";

export const platforms = [
  { name: "GitHub", color: "bg-black", icon: GitHubIcon },
  { name: "YouTube", color: "bg-red-600", icon: YoutubeIcon },
  { name: "LinkedIn", color: "bg-blue-600", icon: LinkedinIcon },
  { name: "Facebook", color: "bg-blue-800", icon: FacebookIcon },
];

export function GetIconByName(name) {
  const found = platforms.find((item) => item.name === name);
  return found ? found.icon : null;
}
