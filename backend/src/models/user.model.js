/** @format */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    avatar: {
      type: String,
      default: null,
    },
    streak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
