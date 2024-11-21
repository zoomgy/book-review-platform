import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../userslice";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/logout", {
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
          <li>
            <Link
              to="/"
              className="hover:underline hover:text-blue-300 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/review"
              className="hover:underline hover:text-blue-300 transition-colors duration-300"
            >
              Review
            </Link>
          </li>
          {user && !user.isAuthenticated && (
            <li>
              <Link
                to="/login"
                className="hover:underline hover:text-blue-300 transition-colors duration-300"
              >
                Login
              </Link>
            </li>
          )}
          {user && !user.isAuthenticated && (
            <li>
              <Link
                to="/register"
                className="hover:underline hover:text-blue-300 transition-colors duration-300"
              >
                Register
              </Link>
            </li>
          )}
          {user.isAuthenticated && (
            <li>
              <Link
                to="/profile"
                className="hover:underline hover:text-blue-300 transition-colors duration-300"
              >
                {user.name}
              </Link>
            </li>
          )}
          {user.isAuthenticated && (
            <button
              onClick={handleLogout}
              className="hover:underline text-blue-400 hover:text-blue-300 transition-colors duration-300"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
