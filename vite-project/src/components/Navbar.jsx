import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../userslice";
import BACKEND_URL from "../Constants.js";
import { FaUser, FaHome, FaFingerprint, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 h-full">
        <div className="text-lg font-bold">
          <Link
            to="/"
            className="hover:opacity-90 transition-opacity duration-300"
          >
            BookReview
          </Link>
        </div>
        <ul className="flex flex-row gap-6 text-sm md:text-base">
          <li className="flex items-center justify-center gap-1">
            <FaHome></FaHome>
            <Link
              to="/"
              className="hover:underline hover:text-blue-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          {user && !user.isAuthenticated && (
            <li className="flex items-center justify-center gap-1">
              <FaFingerprint></FaFingerprint>
              <Link
                to="/login"
                className="hover:underline hover:text-blue-300 transition-colors duration-300"
              >
                Login
              </Link>
            </li>
          )}
          {user.isAuthenticated && (
            <li className="flex items-center justify-center gap-1">
              <FaUser></FaUser>
              <Link
                to="/profile"
                className="hover:underline hover:text-blue-300 transition-colors duration-300"
              >
                {user.name}
              </Link>
            </li>
          )}
          {user.isAuthenticated && (
            <div className="flex items-center justify-center gap-1">
              <FaSignOutAlt></FaSignOutAlt>
              <button
                onClick={handleLogout}
                className="hover:underline text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
