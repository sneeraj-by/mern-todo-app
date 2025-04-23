import React, { useContext } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { AuthContext } from "../context/AuthContextProvider";

const Navbar = () => {
  const { isUserId, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await apiClient.post("/users/logout");
    localStorage.removeItem("userId");
    setUserId(null);
    navigate("/");
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <p>
            <span className="text-xl font-bold italic text-white">
              TODO<span className="text-red-500">App</span>
            </span>
          </p>
        </div>
        <div className="hidden md:flex space-x-4">
          {/* <a href="#" className="text-gray-300 hover:text-white">
            Home
          </a> */}
          {isUserId && (
            <div className="flex items-center justify-between text-white cursor-pointer font-semibold bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded-xs">
              <MdOutlineLogout className="me-1" size={16} />
              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="md:hidden">
          {isUserId && (
            <div className="flex items-center justify-between text-white cursor-pointer font-semibold bg-gray-700 hover:bg-gray-600 py-1 px-2 rounded-xs">
              <MdOutlineLogout className="me-1" size={16} />
              <button
                type="button"
                onClick={handleLogout}
                className="cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
          {/* <button className="text-white focus:outline-none">
            <GiHamburgerMenu />
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
