/** @format */

const Subject = require("../models/subject.model");
const Topic = require("../models/topic.model");
const Revision = require("../models/revision.model");

const getDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalSubjects,
      totalTopics,
      todayRevisions,
      overdueCount,
      upcomingCount,
      completedToday,
    ] = await Promise.all([
      Subject.countDocuments({ user: req.user._id }),
      Topic.countDocuments({ user: req.user._id, isArchived: false }),

      Revision.find({
        user: req.user._id,
        completedAt: null,
        scheduledDate: {
          $lte: today,
        },
      })
        .populate("subject", "name color")
        .populate({
          path: "topic",
          select: "name difficulty",
          match: {
            isArchived: false,
          },
        })
        .sort({ scheduledDate: 1 }),

      Revision.aggregate([
        {
          $match: {
            user: req.user._id,
            completedAt: null,
            scheduledDate: {
              $lt: startOfToday,
            },
          },
        },
        {
          $lookup: {
            from: "topics",
            localField: "topic",
            foreignField: "_id",
            as: "topic",
          },
        },
        {
          $unwind: "$topic",
        },
        {
          $match: {
            "topic.isArchived": false,
          },
        },
        {
          $count: "count",
        },
      ]),

      Revision.aggregate([
        {
          $match: {
            user: req.user._id,
            completedAt: null,
            scheduledDate: {
              $gt: today,
            },
          },
        },
        {
          $lookup: {
            from: "topics",
            localField: "topic",
            foreignField: "_id",
            as: "topic",
          },
        },
        {
          $unwind: "$topic",
        },
        {
          $match: {
            "topic.isArchived": false,
          },
        },
        {
          $count: "count",
        },
      ]),

      Revision.countDocuments({
        user: req.user._id,
        completedAt: {
          $gte: startOfToday,
          $lte: today,
        },
      }),
    ]);

    const activeTodayRevisions = todayRevisions.filter(
      (revision) => revision.topic !== null,
    );
    const overdue = overdueCount[0]?.count || 0;
    const upcoming = upcomingCount[0]?.count || 0;

    return res.status(200).json({
      message: "Dashboard fetched successfully",
      summary: {
        totalSubjects,
        totalTopics,
        today: activeTodayRevisions.length,
        completedToday,
        overdue: overdue,
        upcoming: upcoming,
        streak: req.user.streak,
        longestStreak: req.user.longestStreak,
      },
      todayRevisions: activeTodayRevisions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getDashboard };
