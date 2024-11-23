import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addNewBook,
  getAllBooks,
  findABook,
  submitReview,
  handleBookDelete,
  handleReviewDelete,
} from "../controllers/book.controller.js";

const router = express.Router();
router.get("/", getAllBooks);
router.post("/book", addNewBook);
router.post("/book/:id/review", submitReview);
router.get("/book/:id", findABook);
router.delete("/book/:id", protect, handleBookDelete);
router.delete("/book/review/:id", handleReviewDelete);

export default router;
