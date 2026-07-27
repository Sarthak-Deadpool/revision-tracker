/** @format */

const mongoose = require("mongoose");

const revisionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
      required: true,
    },
    revisionNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    completedAt: {
      type: Date,
      default: null,
      validate: {
        validator(value) {
          return value === null || value >= this.scheduledDate;
        },
        message: "Completion date cannot be before scheduled date.",
      },
    },
    rating: {
      type: String,
      enum: ["Again", "Good", "Easy"],
      default: null,
    },
    easeFactor: {
      type: Number,
      required: true,
      default: 2.5,
      min: 1.3,
      max: 3,
    },

    interval: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    repetition: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

revisionSchema.index({
  user: 1,
  scheduledDate: 1,
});

revisionSchema.index(
  {
    topic: 1,
    revisionNumber: 1,
  },
  {
    unique: true,
  },
);
revisionSchema.index({
  topic: 1,
  completedAt: 1,
});

const Revision = mongoose.model("Revision", revisionSchema);

module.exports = Revision;
