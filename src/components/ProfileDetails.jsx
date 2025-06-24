import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../context/FormDataContext";
import Header from "./Header";
import LeftPreviewMobile from "./LeftPreviewMobile";
import { platforms } from "./GetIconByName";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../lib/supabaseClient";

function ProfileDetails() {
  const { profile, setProfile, links } = useFormData();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
    },
  });

  const imageFileList = watch("image");

  const onSubmit = async (data) => {
    const file = data.image?.[0];
    let imageURL = profile.image;

    if (file) {
      const fileExt = file.name.split(".").pop();
      const filePath = `public/${uuidv4()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        console.error(
          "Image upload failed:",
          uploadError.message || uploadError
        );
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      imageURL = publicUrlData.publicUrl;
    }

    setProfile({
      ...profile,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      image: imageURL,
    });

    navigate("/preview");
  };

  return (
    <div className="min-h-screen flex flex-col max-w-[1280px] mx-auto">
      <Header Page="profile-details" />

      <div className="flex flex-grow flex-col lg:flex-row p-6 gap-6">
        <div className="lg:w-2/5 bg-white rounded-lg p-6">
          <LeftPreviewMobile
            links={links}
            platforms={platforms}
            profile={{
              ...profile,
              firstName: watch("firstName"),
              lastName: watch("lastName"),
              email: watch("email"),
              image: imageFileList?.[0]
                ? URL.createObjectURL(imageFileList[0])
                : profile.image,
            }}
          />
        </div>

        <div className="lg:w-3/5 bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Profile Details
          </h1>
          <p className="text-gray-500 mb-6">
            Add your details to create a personal touch to your profile.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="text-left mt-12">
            <div className="mb-4">
              <label className="block font-medium mb-1">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1">First Name</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                })}
                className={`w-full p-2 border rounded ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                })}
                className={`w-full p-2 border rounded ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                className={`w-full p-2 border rounded ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {links.length > 0 && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border bg-purple-600 text-white font-semibold py-2.5 rounded-md hover:bg-purple-50 hover:text-purple-600 transition duration-200 mb-6 px-8 mt-12"
                >
                  Preview
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
