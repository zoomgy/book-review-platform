import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../Constants.js";
import { v4 } from "uuid";

const BookPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state);
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [review, setReview] = useState("");
  const [users, setUsers] = useState({});
  const fetchBook = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/book/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch the book");
      }
      setBook(data);
      setLoading(false);

      const usersArray = {};
      for (let i = 0; i < data.reviews.length; i++) {
        const usersResponse = await fetch(
          `${BACKEND_URL}/${data.reviews[i].userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const usersData = await usersResponse.json();
        usersArray[usersData.user.id] = usersData.user.name;
      }
      setUsers(usersArray);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review) {
      setError("Please enter a review.");
      return;
    }
    try {
      const response = await fetch(`${BACKEND_URL}/book/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, review }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      setReview("");
      alert("Review submitted successfully!");

      await fetchBook();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    setTimeout(() => {
      setError("");
    }, 1000);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }
  const handleBookRemoval = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/book/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          bookAddedBy: book.userId,
          bookId: id,
        }),
      });
      if (!response.ok) {
        return setError("Error Deleting Book");
      }
      alert("Book Deleted successfully!");
      navigate("/");
    } catch (error) {
      setError("Error Deleting Book");
      console.log(error);
    }
  };

  const handleReviewRemoval = async (reviewId) => {
    console.log(reviewId);
    try {
      const response = await fetch(`${BACKEND_URL}/book/review/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          reviewId,
          bookId: id,
        }),
      });
      if (!response.ok) {
        return setError("Error Deleting Review");
      }
      alert("Review Deleted successfully!");
      navigate("/");
    } catch (error) {
      setError("Error Deleting Review");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <img
          src={book.coverImage || "default-cover.jpg"}
          alt={book.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
        <h2 className="text-xl text-gray-600 mb-2">by {book.author}</h2>
        <p className="text-gray-500 mb-6">Genre: {book.genre}</p>
        <p className="text-gray-700 leading-7">{book.description}</p>
        {/* Review Form - Only visible if user is authenticated */}
        {user.isAuthenticated && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <textarea
                className="w-full p-3 border rounded-lg"
                placeholder="Write your review here..."
                value={review}
                onChange={handleReviewChange}
                rows="5"
              />
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        )}
        {/* If the user is not authenticated, display a message */}
        {!user.isAuthenticated && (
          <p className="mt-4 text-gray-600">
            You must be logged in to leave a review.
            <Link className="text-blue-600" to={"/login"}>
              {"  "}Login
            </Link>
          </p>
        )}
        {/* Display All Reviews Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-4">
            {book.reviews && book.reviews.length > 0 ? (
              book.reviews.map((review, index) => (
                <div key={index} className="border-t pt-4 flex justify-between">
                  <div key={v4()}>
                    <p className="text-lg font-semibold">
                      {users[review.userId] || "Unknown User"}
                    </p>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                  {review.userId === user.id && (
                    <div key={v4()}>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          handleReviewRemoval(review._id);
                        }}
                        className="bg-red-600 pt-1 pb-1 p-2 rounded-sm text-white hover:bg-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
        </div>
        {user.isAuthenticated && user.id === book.userId && (
          <div className="mt-5">
            <button
              onClick={handleBookRemoval}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500"
            >
              Remove This Book
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookPage;
