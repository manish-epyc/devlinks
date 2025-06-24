import { Navigate, useLocation } from "react-router-dom";
import { useAuthData } from "../../context/AuthContext";
import { useMatch } from "react-router-dom";

function RedirectIfLoggedIn() {
  const { user } = useAuthData();
  const location = useLocation();

  const isPublicProfilePage = useMatch("/profile/:profile_link");

  if (
    user &&
    (location.pathname === "/" || location.pathname === "/create-account")
  ) {
    return <Navigate to="/link" replace />;
  }

  if (
    !user &&
    location.pathname !== "/create-account" &&
    !isPublicProfilePage
  ) {
    return <Navigate to="/" replace />;
  }

  return null;
}

export default RedirectIfLoggedIn;
