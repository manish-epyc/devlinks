import { useForm } from "react-hook-form";
import EmailIcon from "../assets/icon-email.svg?react";
import PasswordIcon from "../assets/icon-password.svg?react";
import devLinkLogo from "../assets/logo.svg";
import { Link } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

function CreateAccount() {
  const [showMessage, setShowMessage] = useState({
    success: false,
    error: false,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const handleMessage = (obj) => {
    setShowMessage((prev) => ({ ...prev, ...obj }));
    setTimeout(() => {
      setShowMessage({
        success: false,
        error: false,
        message: "",
      });
    }, 4000);
  };

  async function handleCreateAccount(formData) {
    const email = formData.email?.trim();
    const password = formData.password?.trim();
    const confirmpassword = formData.confirmpassword?.trim();

    if (!email || !password || !confirmpassword) {
      throw new Error("All fields are required.");
    }

    if (password !== confirmpassword) {
      throw new Error("Passwords do not match.");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (error) {
      // console.error(error.message);
      handleMessage({
        success: false,
        error: true,
        message: "Something went wrong.",
      });
    } else if (!data.user) {
      handleMessage({
        success: false,
        error: true,
        message:
          "This email is already registered. Check your inbox to confirm.",
      });
    } else {
      handleMessage({
        success: true,
        error: false,
        message: "Account created. Check your email to confirm.",
      });

      return { success: true };
    }
  }

  const onSubmit = async (formData) => {
    try {
      await handleCreateAccount(formData);
      // setShowMessage(true);
      reset();
    } catch (err) {
      alert(err.message);
    }

    console.log(showMessage);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {showMessage.message && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-4 rounded-lg text-white text-sm shadow-lg animate-fade-in-out z-50 ${
            showMessage.error ? "bg-red-600" : "bg-green-600"
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
          <span>{showMessage.message}</span>
        </div>
      )}

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="mb-8">
          <img src={devLinkLogo} alt="Devlinks Logo" className="mx-auto h-12" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-left mt-24">
          Create account
        </h1>
        <p className="text-gray-500 mb-8 text-left">
          Let’s get you started sharing your links!
        </p>

        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 text-left">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <EmailIcon />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="e.g. alex@email.com"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-center text-sm mb-4">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6 text-left">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <PasswordIcon />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && (
              <span className="text-red-500 text-center text-sm mb-4">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-6 text-left">
            <label
              htmlFor="confirmpassword"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <PasswordIcon />
              </span>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                placeholder="Enter your confirm password"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                {...register("confirmpassword", { required: true })}
              />
            </div>
            {errors.confirmpassword && (
              <span className="text-red-500 text-center text-sm mb-4">
                This field is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 h-12 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm">
          <span>Already have an account? </span>
          <Link
            to="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateAccount;
