/** @format */

const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  changePassword,
} = require("../controllers/user.controller");
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.patch("/profile", protect, upload.single("avatar"), updateProfile);
router.patch("/change-password", protect, changePassword);

module.exports = router;
