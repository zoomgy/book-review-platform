import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      unique: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      maxlength: [100, "Author name cannot exceed 100 characters"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    coverImage: {
      type: String,
      default: "default-cover.jpg",
    },
    reviews: [reviewSchema], // Array to store reviews for the book
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
