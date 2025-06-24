import { Link } from "react-router";
import devLinkLogo from "../assets/logo.svg";
import { useState } from "react";
import { useAuthData } from "../context/AuthContext";

function Header(props) {
  const { user, logout } = useAuthData();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white p-4 md:px-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center">
        <Link to={"/"}>
          <img src={devLinkLogo} alt="Devlinks Logo" className="mx-auto h-8" />
        </Link>
      </div>

      <nav className="flex-grow flex justify-center">
        <div className="flex rounded-lg p-1 space-x-2">
          <Link
            to="/link"
            className={`relative flex items-center justify-center px-6 py-2 rounded-md text-gray-600 font-semibold transition duration-200 hover:text-blue-600 ${
              props.Page == "link" ? "tab-active" : ""
            }`}
          >
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
            Links
          </Link>
          <Link
            to="/profile-details"
            className={`relative flex items-center justify-center px-6 py-2 rounded-md text-gray-600 font-semibold transition duration-200 hover:text-blue-600 ${
              props.Page == "profile-details" ? "tab-active" : ""
            }`}
          >
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            Profile Details
          </Link>
        </div>
      </nav>

      <Link
        to="/preview"
        className="border border-blue-600 text-blue-600 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 transition duration-200 text-center w-full md:w-auto"
      >
        Preview
      </Link>

      {user?.email && (
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="border border-white text-white bg-blue-600 font-semibold py-2 px-6 rounded-md transition duration-200 text-center w-full md:w-auto flex items-center"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              {user?.email}
              <svg
                className="-mr-1 size-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div className="py-1" role="none">
                <button
                  type="submit"
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
