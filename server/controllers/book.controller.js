import Book from "../models/book.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const addNewBook = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const { userId, title, author, genre, description, coverImage } = req.body;
    if (decoded.id !== userId) {
      return res.status(403).json({ message: "Admin privileges required" });
    }
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return res.status(400).json({ message: "Book already exists" });
    }
    if (!title || !author || !genre) {
      return res
        .status(400)
        .json({ message: "Title, author, and genre are required" });
    }

    const newBook = new Book({
      userId,
      title,
      author,
      genre,
      description,
      coverImage,
    });

    await newBook.save();

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
};
const findABook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching the book", error: error.message });
  }
};

const submitReview = async (req, res) => {
  try {
    const { userId, review } = req.body;
    const bookId = req.params.id;
    if (!review) {
      return res.status(400).json({ message: "Review text is required" });
    }
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    book.reviews.push({ userId, review });
    await book.save();

    res.status(201).json({ message: "Review added successfully", book });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error submitting review", error: error.message });
  }
};
const handleReviewDelete = async (req, res) => {
  try {
    const { reviewId, bookId } = req.body;
    const bookForWhichReviewIsToBeDeleted = await Book.findById(bookId);
    if (!bookForWhichReviewIsToBeDeleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    const updatedReviews = bookForWhichReviewIsToBeDeleted.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    bookForWhichReviewIsToBeDeleted.reviews = updatedReviews;
    await bookForWhichReviewIsToBeDeleted.save();
    res.status(200).json({
      message: "Review deleted successfully",
      book: bookForWhichReviewIsToBeDeleted,
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the review" });
  }
};

const handleBookDelete = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, JWT_SECRET);
    const { bookAddedBy, bookId } = req.body;
    if (bookAddedBy !== decoded.id) {
      return res
        .status(401)
        .json({ message: "You can only delete book added by you !" });
    }
    const bookToDelete = await Book.findByIdAndDelete(bookId);
    if (!bookToDelete) {
      return res.status(401).json({ message: "Book Not Found" });
    }
    res.status(201).json({ message: "Book Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Book", error: error.message });
  }
};
export {
  addNewBook,
  getAllBooks,
  findABook,
  submitReview,
  handleBookDelete,
  handleReviewDelete,
};
