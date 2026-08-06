/** @format */

const mongoose = require("mongoose");

const Subject = require("../models/subject.model");
const Topic = require("../models/topic.model");
const Revision = require("../models/revision.model");

// to create new subject

const createSubject = async (req, res) => {
  try {
    const { name, color, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Subject name is required",
      });
    }

    const normalizedName = name.trim().toLowerCase();

    if (normalizedName.length < 2) {
      return res.status(400).json({
        message: "Subject name must be at least 2 characters long.",
      });
    }

    if (normalizedName.length > 50) {
      return res.status(400).json({
        message: "Subject name cannot exceed 50 characters.",
      });
    }

    const subject = await Subject.create({
      user: req.user._id,
      name: normalizedName,
      color: color?.trim() || undefined,
      description: description?.trim() || undefined,
    });

    return res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Subject already exists",
      });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//To get all subjects

const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const subjectsWithCount = await Promise.all(
      subjects.map(async (subject) => {
        const topicCount = await Topic.countDocuments({
          subject: subject._id,
          user: req.user._id,
          isArchived: false,
        });

        return {
          ...subject.toObject(),
          topicCount,
        };
      }),
    );

    return res.status(200).json({
      message: "Subjects fetched successfully",
      subjects: subjectsWithCount,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//to get subject by ID

const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid subject ID.",
      });
    }

    const subject = await Subject.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    return res.status(200).json({
      message: "Subject fetched successfully",
      subject,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid subject ID",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// to update Subject

const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color, description } = req.body;

    if (
      name === undefined &&
      color === undefined &&
      description === undefined
    ) {
      return res.status(400).json({
        message: "At least one field is required to update.",
      });
    }

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        message: "Subject name can not be empty ",
      });
    }

    const subject = await Subject.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!subject) {
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    const updateData = {};

    if (name !== undefined) {
      const normalizedName = name.trim().toLowerCase();

      if (!normalizedName) {
        return res.status(400).json({
          message: "Subject name cannot be empty.",
        });
      }

      if (normalizedName.length < 2) {
        return res.status(400).json({
          message: "Subject name must be at least 2 characters long.",
        });
      }

      if (normalizedName.length > 50) {
        return res.status(400).json({
          message: "Subject name cannot exceed 50 characters.",
        });
      }

      updateData.name = normalizedName;
    }

    if (color !== undefined) {
      updateData.color = color.trim();
    }

    if (description !== undefined) {
      updateData.description = description.trim();
    }

    Object.assign(subject, updateData);
    await subject.save();

    return res.status(200).json({
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Subject already exists.",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Subject Id",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// to delete Subject

const deleteSubject = async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid subject ID.",
      });
    }

    const subject = await Subject.findOne({
      _id: id,
      user: req.user._id,
    }).session(session);

    if (!subject) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    await Revision.deleteMany(
      {
        subject: subject._id,
        user: req.user._id,
      },
      {
        session,
      },
    );

    await Topic.deleteMany(
      {
        subject: subject._id,
        user: req.user._id,
      },
      {
        session,
      },
    );

    await subject.deleteOne({ session });

    await session.commitTransaction();

    return res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Subject Id",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

module.exports = {
  createSubject,
  getSubjects,
  getSubjectById,
  updateSubject,
  deleteSubject,
};
