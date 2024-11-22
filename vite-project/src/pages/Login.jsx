import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../userslice.js";
import { Link, useNavigate } from "react-router-dom";
import BACKEND_URL from "../Constants.js";

const Login = () => {
  const { user } = useSelector((state) => state);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

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
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      setSuccess("Login successful!");
      setTimeout(() => {
        setSuccess("");
      }, 1000);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      dispatch(login(data.user));
    } catch (err) {
      setError(err.message || "Username or Email incorrect");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {!user.isAuthenticated ? (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Login
          </h2>
          {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
          {success && (
            <div className="mt-4 text-sm text-green-500">{success}</div>
          )}
          <form onSubmit={handleSubmit} className="mt-6">
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
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
            >
              Login
            </button>
          </form>
          <p className="mt-2">
            Dont Have an Account ?{"   "}
            <Link className="text-blue-600" to={"/register"}>
              Register
            </Link>
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-3xl font-bold">Welcome, {user.name}!</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
