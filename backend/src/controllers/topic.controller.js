/** @format */

const mongoose = require("mongoose");
const Subject = require("../models/subject.model");
const Topic = require("../models/topic.model");
const Revision = require("../models/revision.model");

// to create topic

const createTopic = async (req, res) => {
  const { subject, name, difficulty, notes } = req.body;

  if (!subject || !name?.trim() || !difficulty?.trim()) {
    return res.status(400).json({
      message: "Subject, Name and Difficulty are required",
    });
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return res.status(400).json({
      message: "Topic name must be at least 2 characters long.",
    });
  }

  if (trimmedName.length > 50) {
    return res.status(400).json({
      message: "Topic name cannot exceed 50 characters.",
    });
  }

  const trimmedDifficulty = difficulty.trim();

  const allowedDifficulty = ["Easy", "Medium", "Hard"];

  if (!allowedDifficulty.includes(trimmedDifficulty)) {
    return res.status(400).json({
      message: "Invalid difficulty level.",
    });
  }

  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const existingSubject = await Subject.findOne({
      _id: subject,
      user: req.user._id,
    }).session(session);

    if (!existingSubject) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Subject not found",
      });
    }

    const [topic] = await Topic.create(
      [
        {
          user: req.user._id,
          subject: existingSubject._id,
          name: trimmedName,
          difficulty: trimmedDifficulty,
          notes: notes?.trim() || undefined,

          currentEaseFactor: 2.5,
          currentInterval: 0,
          currentRepetition: 0,
        },
      ],
      { session },
    );

    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + 1);

    await Revision.create(
      [
        {
          user: req.user._id,
          subject: existingSubject._id,
          topic: topic._id,
          revisionNumber: 1,
          scheduledDate: scheduledDate,
          completedAt: null,
          rating: null,
          easeFactor: 2.5,
          interval: 0,
          repetition: 0,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return res.status(201).json({
      message: "Topic created successfully",
      topic,
    });
  } catch (error) {
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Topic already exists",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid subject id",
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
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

// get all topics

const getTopics = async (req, res) => {
  try {
    const { archived } = req.query;

    const filter = {
      user: req.user._id,
    };

    if (archived === "true") {
      filter.isArchived = true;
    } else if (archived !== "all") {
      filter.isArchived = false;
    }

    const topics = await Topic.find(filter)
      .populate("subject", "name color")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Topics fetched successfully",
      count: topics.length,
      topics,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// find topic by id

const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid topic ID.",
      });
    }

    const topic = await Topic.findOne({
      _id: id,
      user: req.user._id,
      isArchived: false,
    }).populate("subject", "name color");

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    return res.status(200).json({
      message: "Topic fetched successfully",
      topic,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid topic ID",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// update topic

const updateTopic = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, difficulty, notes } = req.body;

    const trimmedName = name?.trim();
    const trimmedDifficulty = difficulty?.trim();
    const trimmedNotes = notes?.trim();

    if (name === undefined && difficulty === undefined && notes === undefined) {
      return res.status(400).json({
        message: "At least one field required to update",
      });
    }

    if (name !== undefined && !trimmedName) {
      return res.status(400).json({
        message: "Topic name can not be empty ",
      });
    }
    if (trimmedName !== undefined) {
      if (trimmedName.length < 2) {
        return res.status(400).json({
          message: "Topic name must be at least 2 characters long.",
        });
      }

      if (trimmedName.length > 50) {
        return res.status(400).json({
          message: "Topic name cannot exceed 50 characters.",
        });
      }
    }

    const allowedDifficulty = ["Easy", "Medium", "Hard"];

    if (
      trimmedDifficulty !== undefined &&
      !allowedDifficulty.includes(trimmedDifficulty)
    ) {
      return res.status(400).json({
        message: "Invalid difficulty level.",
      });
    }

    const topic = await Topic.findOne({
      _id: id,
      user: req.user._id,
      isArchived: false,
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    const updateData = {};

    if (name !== undefined) {
      updateData.name = trimmedName;
    }
    if (difficulty !== undefined) {
      updateData.difficulty = trimmedDifficulty;
    }
    if (notes !== undefined) {
      updateData.notes = trimmedNotes;
    }

    Object.assign(topic, updateData);
    await topic.save();

    return res.status(200).json({
      message: "Topic updated successfully ",
      topic,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Topic already exists",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid topic id",
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

// Delete topic

const deleteTopic = async (req, res) => {
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Invalid topic ID.",
      });
    }

    const topic = await Topic.findOne({
      _id: id,
      user: req.user._id,
      isArchived: false,
    }).session(session);

    if (!topic) {
      await session.abortTransaction();
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    await Revision.deleteMany(
      {
        topic: topic._id,
        user: req.user._id,
      },
      {
        session,
      },
    );
    await topic.deleteOne({ session });

    await session.commitTransaction();

    return res.status(200).json({
      message: "Topic deleted successfully",
    });
  } catch (error) {
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }
    console.error(error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid Topic ID",
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

const archivedTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic id.",
      });
    }

    const topic = await Topic.findOne({
      _id: topicId,
      user: req.user._id,
    });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found.",
      });
    }

    if (topic.isArchived) {
      return res.status(400).json({
        success: false,
        message: "Topic is already archived.",
      });
    }

    topic.isArchived = true;

    await topic.save();
    return res.status(200).json({
      success: true,
      message: "Topic archived successfully.",
      topic,
    });
  } catch (error) {
    console.error("Error in archiveTopic:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const unarchiveTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid topic id.",
      });
    }

    const topic = await Topic.findOne({
      _id: topicId,
      user: req.user._id,
    });

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found.",
      });
    }

    if (!topic.isArchived) {
      return res.status(400).json({
        success: false,
        message: "Topic is already active.",
      });
    }

    topic.isArchived = false;

    await topic.save();

    return res.status(200).json({
      success: true,
      message: "Topic unarchived successfully.",
      topic,
    });
  } catch (error) {
    console.error("Error in unarchiveTopic:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

const getArchivedTopics = async (req, res) => {
  try {
    const archivedTopics = await Topic.find({
      user: req.user._id,
      isArchived: true,
    })
      .populate("subject")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Archived topics fetched successfully.",
      archivedTopics,
    });
  } catch (error) {
    console.error("Error in getArchivedTopics:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
module.exports = {
  createTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  archivedTopic,
  unarchiveTopic,
  getArchivedTopics,
};
