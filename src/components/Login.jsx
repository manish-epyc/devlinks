import { useForm } from "react-hook-form";

import EmailIcon from "../assets/icon-email.svg?react";
import PasswordIcon from "../assets/icon-password.svg?react";
import devLinkLogo from "../assets/logo.svg";

import { Link, useNavigate } from "react-router";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";


function Login() {
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email: data.email.trim(),
          password: data.password.trim(),
        });

      if (error) {
        setError("serverError", {
          type: "manual",
          message: "Incorrect email or password. Please try again.",
        });
        return;
      }

      if (data) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/link");
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      setError("serverError", {
        type: "manual",
        message: "Something went wrong. Try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      {showSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-4 rounded-lg bg-green-600 text-white text-sm shadow-lg animate-fade-in-out z-50">
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
          <span>Success. You’re now logged in.</span>
        </div>
      )}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <div className="mb-8">
          <img src={devLinkLogo} alt="Devlinks Logo" className="mx-auto h-12" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-left mt-24">
          Login
        </h1>
        <p className="text-gray-500 mb-8 text-left">
          Add your details below to get back into the app
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

          {errors.serverError && (
            <p className="text-red-500 text-center text-sm mb-4">
              {errors.serverError.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 h-12 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-gray-500 text-sm">
          <span>Don't have an account? </span>
          <Link
            className="text-blue-600 hover:text-blue-700 font-medium"
            to="/create-account"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
