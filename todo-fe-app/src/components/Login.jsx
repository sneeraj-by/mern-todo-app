import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

import { userLogin, userRegistration } from "../api/apiRoutes";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { notify } from "../utils/notify";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [actionType, setActionType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (actionType === "register") {
      try {
        await userRegistration({
          email: data.email,
          password: data.password,
        });
        notify("Registration successful!", "success");
      } catch (err) {
        notify("Registration failed!", "error");
      }
    } else {
      try {
        const res = await userLogin({
          email: data.email,
          password: data.password,
        });
        if (res.status === 200) {
          setUserId(res.data.userId);
          navigate("/todo");
        }
      } catch (err) {
        notify.error("Invalid Credentials. Please try again.", "error");
        setErrorMessage("Invalid Credentials. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const lowerCaseValue = e.target.value.toLowerCase();
    setValue("email", lowerCaseValue, { shouldValidate: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col md:flex-row md:h-[calc(100vh-93px)] h-[calc(100vh-61px)]">
      {/* Left Section - Hidden on Mobile */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center py-8">
        <h1 className="text-5xl md:text-8xl font-bold text-blue-300 text-center">
          HELLO THERE!
        </h1>
        <p className="mt-2 text-lg md:text-xl text-left w-full pl-4 lg:pl-12 ml-30.5">
          Welcome to{" "}
          <span className="font-bold italic text-gray-900">
            TODO <span className="text-red-500">App</span>
          </span>
        </p>
        <div className="mt-8">
          {/* <img src={loginHeroImage} alt="AI Illustration" className="w-108" /> */}
        </div>
      </div>

      {/* Right Section - Full Height on Mobile */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 md:m-4 p-4 lg:p-0 md:h-[calc(100vh-93px)] overflow-hidden h-[calc(100vh-61px)]">
        {" "}
        {/* Full viewport height */}
        <div className="max-w-sm w-full">
          <div className="flex justify-between items-center">
            <p className="text-lg text-left py-5">
              <span className="text-xl font-bold italic text-gray-900">
                TODO<span className="text-red-500">App</span>
              </span>
            </p>
            {errorMessage && (
              <p className="text-sm font-semibold text-red-500">
                {errorMessage}
              </p>
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between mb-2">
              <label htmlFor="email" className="block">
                Email Id
              </label>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <input
              type="email"
              id="email"
              placeholder="Enter your email id"
              className="w-full p-3 border rounded mb-4 text-gray-700"
              autocomplete="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
                onChange: handleChange,
              })}
            />
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="block">
                Password
              </label>
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="w-full p-3 border rounded mb-4 text-gray-700"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3 -mt-4 cursor-pointer"
              >
                {showPassword ? (
                  <FaRegEye className="h-5 w-5 text-gray-500" />
                ) : (
                  <FaRegEyeSlash className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <div className="space-x-4 flex">
              <button
                type="submit"
                className="w-1/2 text-sm font-bold bg-gray-900 hover:bg-gray-700 text-white px-5 py-3 rounded cursor-pointer"
                onClick={() => setActionType("login")}
              >
                Login
              </button>
              <button
                type="submit"
                className="w-1/2 text-sm font-bold bg-rose-900 hover:bg-rose-700 text-white px-5 py-3 rounded cursor-pointer"
                onClick={() => setActionType("register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
