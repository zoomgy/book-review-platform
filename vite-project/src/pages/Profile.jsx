import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../userslice.js";
import { Link } from "react-router-dom";
import BACKEND_URL from "../Constants.js";

const Profile = () => {
  const { user } = useSelector((state) => state);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState(user.name);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(user.isAdmin === true ? "Yes" : "No");
  const handleLogout = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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
      setError("Logout unsuccessful.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${BACKEND_URL}/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          isAdmin: isAdmin === "Yes" ? true : false,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      setSuccess("Updation successful!");
      setTimeout(() => {
        setSuccess("");
      }, 1000);
      dispatch(login(data.user));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {user.isAuthenticated ? (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Welcome {user.name} !
          </h2>
          {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
          {success && (
            <div className="mt-4 text-sm text-green-800 font-bold">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                isAdmin
              </label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isAdmin"
                    value="Yes"
                    checked={isAdmin === "Yes"}
                    onChange={(e) => setIsAdmin(e.target.value)}
                    className="text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="isAdmin"
                    value="No"
                    checked={isAdmin === "No"}
                    onChange={(e) => setIsAdmin(e.target.value)}
                    className="text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-green-700 rounded-md hover:bg-green-800 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Update Account
            </button>
          </form>
          {user.isAdmin && (
            <Link to={"/addnewbook"}>
              <button
                type="none"
                className="mt-4 w-full px-4 py-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
              >
                Add New Book
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl font-bold">Login To View Your Profile</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
