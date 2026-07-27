/** @format */

const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      minlength: [2, "Subject length must be at least 2 characters"],
      maxlength: [50, "Subject name cannot exceed 50 characters"],
    },
    color: {
      type: String,
      trim: true,
      default: "#000000",
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid color code"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
  },
);

subjectSchema.index(
  {
    user: 1,
    name: 1,
  },
  {
    unique: true,
    collation: {
      locale: "en",
      strength: 2,
    },
  },
);

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
