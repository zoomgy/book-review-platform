import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  addNewBook,
  getAllBooks,
  findABook,
  submitReview,
} from "../controllers/book.controller.js";

const router = express.Router();
router.get("/", getAllBooks);
router.post("/book", addNewBook);
router.post("/book/:id/review", submitReview);
router.get("/book/:id", findABook);

export default router;
