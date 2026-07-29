/** @format */

const express = require("express");
const {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/verify-email", verifyEmail);
router.post("/resend-verification-otp", resendVerificationOTP);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/profile", protect, getProfile);
router.patch("/profile", protect, upload.single("avatar"), updateProfile);
router.patch("/change-password", protect, changePassword);

module.exports = router;
