import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:userId", getUserProfile);
router.put("/:id", protect, updateUserProfile);
router.post("/logout", protect, logoutUser);

export default router;
