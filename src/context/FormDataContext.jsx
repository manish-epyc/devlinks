import { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export const FormDataProvider = ({ children }) => {
  const [links, setLinks] = useState([]);
  const [profile, setProfile] = useState({
    image: null,
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <FormDataContext.Provider value={{ links, setLinks, profile, setProfile }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => useContext(FormDataContext);
