import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BACKEND_URL from "../Constants.js";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch books");
        }
        setBooks(data);
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        console.log(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Books Available</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link to={`/book/${book._id}`} key={book._id}>
            <div className="border rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
              <img
                src={book.coverImage || "default-cover.jpg"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">by {book.author}</p>
              <p className="text-sm mt-2 text-gray-700">{book.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
