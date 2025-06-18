import { useFormData } from "../context/FormDataContext";
import { NavLink } from "react-router";
import Header from "./Header";
import LeftPreviewMobile from "./LeftPreviewMobile";
import { platforms } from "./GetIconByName";

function ProfileDetails() {
  const { profile, setProfile, links } = useFormData();

  const handleInputChange = (key, value) => {
    setProfile({ ...profile, [key]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[1280px] mx-auto">
      <Header Page="profile-details" />

      <div className="flex flex-grow flex-col lg:flex-row p-6 gap-6">
        <div className="lg:w-2/5 bg-white rounded-lg p-6">
          <LeftPreviewMobile
            links={links}
            platforms={platforms}
            profile={profile}
          />
        </div>

        <div className="lg:w-3/5 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Profile Details
          </h1>
          <p className="text-gray-500 mb-6">
            Add your details to create a personal touch to your profile.
          </p>
          <div className="text-left mt-12">
            <div className="mb-4">
              <label className="block font-medium mb-1">Profile Image</label>
              <input
                className="w-full p-2 border rounded"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">First Name</label>
              <input
                className="w-full p-2 border rounded"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Last Name</label>
              <input
                className="w-full p-2 border rounded"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                className="w-full p-2 border rounded"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
          </div>

          {links.length > 0 && (
            <NavLink to="/preview">
              <div className="flex justify-end">
                <button className="border bg-purple-600 text-white font-semibold py-2.5 rounded-md hover:bg-purple-50 hover:text-purple-600 transition duration-200 mb-6 px-8 flex justify-end mt-12">
                  Preview
                </button>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
