import { useForm } from "react-hook-form";

import EmailIcon from "../assets/icon-email.svg?react";
import PasswordIcon from "../assets/icon-password.svg?react";
import devLinkLogo from "../assets/logo.svg";

import { Link, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    if (data.email == "test@gmail.com" && data.password == "123") {
      console.log("login successfully");
      navigate("/link");
    } else {
      setError("serverError", {
        type: "manual",
        message: "Incorrect email or password. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
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
