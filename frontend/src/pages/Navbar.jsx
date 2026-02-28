import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // ✅ react-icons
import { useAuth } from "../context/UserContext.jsx";

const Navbar = () => {
  
  const navigate = useNavigate();
  const { user, fetchUserProfile } = useAuth()
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://fullstack-app-cra5.onrender.com/api/users/logout",
        {},
        { withCredentials: true }
      );
     await fetchUserProfile()
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-satisfy text-yellow-300">
            Event App
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <Link
                to="/home"
                className="hover:text-yellow-300 transition duration-300"
              >
                Home
              </Link>
              <Link
                to="/create"
                className="hover:text-yellow-300 transition duration-300"
              >
                Create Event
              </Link>
            </>
          )}

          {user ? (
            <div className="flex items-center space-x-4">
              {/* User name  */}
              <Link
                to="/profile"
                className="hover:text-yellow-300 transition duration-300 flex items-center"
              >
                <FaUser className="w-5 h-5 mr-1" />
                <span>{user.username}</span>
              </Link>

              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 transition duration-300"
              >
                <FaSignOutAlt className="w-5 h-5 mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-yellow-300 transition duration-300 flex items-center"
            >
              <FaUser className="w-5 h-5 mr-1" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

