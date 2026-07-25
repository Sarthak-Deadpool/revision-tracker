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
          name: name.trim(),
          difficulty: difficulty.trim(),
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
    const topics = await Topic.find({
      user: req.user._id,
      isArchived: false,
    });

    return res.status(200).json({
      message: "Topic fetched successfully",
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

    const topic = await Topic.findOne({
      _id: id,
      user: req.user._id,
      isArchived: false,
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not Found",
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
        message: "Invalid topic id",
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

    if (!name?.trim() && !difficulty?.trim() && !notes?.trim()) {
      return res.status(400).json({
        message: "At least one field required to update",
      });
    }

    if (name !== undefined && !name.trim()) {
      return res.status(400).json({
        message: "Topic name can not be empty ",
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
      updateData.name = name;
    }
    if (difficulty !== undefined) {
      updateData.difficulty = difficulty;
    }
    if (notes !== undefined) {
      updateData.notes = notes;
    }

    Object.assign(topic, updateData);
    await topic.save();

    return res.status(200).json({
      message: "Topic updated Successfully ",
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

    const topic = await Topic.findOne({
      _id: id,
      user: req.user._id,
      isArchived: false,
    }).session(session);

    if (!topic) {
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
        message: "Invalid Topic Id",
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
  createTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
};
