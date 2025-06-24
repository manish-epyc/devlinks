import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Link from "./components/Link";
import ProfileDetails from "./components/ProfileDetails";
import Preview from "./components/Preview";
import { FormDataProvider } from "./context/FormDataContext";
import { AuthProvider } from "./context/AuthContext";
import RedirectIfLoggedIn from "./components/Auth/RedirectIfLoggedIn";
import PublicProfile from "./components/PublicProfile";

function App() {
  return (
    <AuthProvider>
      <FormDataProvider>
        <BrowserRouter>
          <RedirectIfLoggedIn />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="link" element={<Link />} />
            <Route path="profile-details" element={<ProfileDetails />} />
            <Route path="preview" element={<Preview />} />
            <Route path="profile/:profile_link" element={<PublicProfile />} />
          </Routes>
        </BrowserRouter>
      </FormDataProvider>
    </AuthProvider>
  );
}

export default App;
