/** @format */

const mongoose = require("mongoose");
const Revision = require("../models/revision.model");
const Topic = require("../models/topic.model");
const { completeRevisionService } = require("../services/revision.service");

// marks revision completed

const completeRevision = async (req, res) => {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const { id } = req.params;
    const { rating } = req.body;

    if (rating === undefined) {
      return res.status(400).json({
        message: "Rating is required",
      });
    }

    const revision = await Revision.findOne({
      _id: id,
      user: req.user._id,
    }).session(session);

    if (!revision) {
      await session.abortTransaction();

      return res.status(400).json({
        message: "Revision not found",
      });
    }

    await completeRevisionService({
      revision,
      rating,
      session,
    });

    await session.commitTransaction();

    return res.status(200).json({
      message: "Revision completed successfully",
    });
  } catch (error) {
    if (session?.inTransaction()) {
      await session.abortTransaction();
    }

    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
};

// fetch today revision

const getTodayRevision = async (req, res) => {
  try {
    const today = new Date();

    today.setHours(23, 59, 59, 999);

    const revisions = await Revision.find({
      user: req.user._id,
      completedAt: null,
      scheduledDate: {
        $lte: today,
      },
    })
      .populate("subject", "name color")
      .populate("topic", "name difficulty")
      .sort({ scheduledDate: 1 });

    return res.status(200).json({
      message: "Today's revisions fetched successfully",
      count: revisions.length,
      revisions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// fetch revision  history by topic

const getRevisionHistory = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({
        message: "Topic ID  is required",
      });
    }

    const topic = await Topic.findOne({
      _id: topicId,
      user: req.user._id,
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    const history = await Revision.find({
      user: req.user._id,
      topic: topicId,
      completedAt: {
        $ne: null,
      },
    }).sort({ revisionNumber: 1 });

    return res.status(200).json({
      message: "History fetched",
      topic: {
        _id: topic._id,
        name: topic.name,
        difficulty: topic.difficulty,
        masteryLevel: topic.masteryLevel,
        totalRevisions: topic.totalRevisions,
      },
      count: history.length,
      history,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get next revisions

const getNextRevision = async (req, res) => {
  try {
    const { topicId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(topicId)) {
      return res.status(400).json({
        message: "Topic ID  is required",
      });
    }

    const topic = await Topic.findOne({
      _id: topicId,
      user: req.user._id,
    });

    if (!topic) {
      return res.status(404).json({
        message: "Topic not found",
      });
    }

    const nextRevision = await Revision.findOne({
      user: req.user._id,
      topic: topicId,
      completedAt: null,
    }).sort({ scheduledDate: 1 });

    if (!nextRevision) {
      return res.status(404).json({
        message: "No upcoming revision found",
      });
    }

    return res.status(200).json({
      message: "Next revision fetched",
      topic: {
    _id: topic._id,
    name: topic.name,
    difficulty: topic.difficulty,
    masteryLevel: topic.masteryLevel,
    totalRevisions: topic.totalRevisions,
  },
      nextRevision,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  completeRevision,
  getTodayRevision,
  getRevisionHistory,
  getNextRevision,
};
