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
      subjectProgress,
      upcomingRevisions,
      recentHistory,
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
      Topic.aggregate([
        {
          $match: {
            user: req.user._id,
            isArchived: false,
          },
        },
        {
          $lookup: {
            from: "subjects",
            localField: "subject",
            foreignField: "_id",
            as: "subject",
          },
        },
        {
          $unwind: "$subject",
        },
        {
          $group: {
            _id: "$subject._id",
            name: {
              $first: "$subject.name",
            },
            color: {
              $first: "$subject.color",
            },
            averageMastery: {
              $avg: "$masteryLevel",
            },
            totalTopics: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            color: 1,
            totalTopics: 1,
            averageMastery: {
              $round: ["$averageMastery", 0],
            },
          },
        },
        {
          $sort: {
            averageMastery: -1,
          },
        },
      ]),

      Revision.find({
        user: req.user._id,
        completedAt: null,
        scheduledDate: {
          $gt: today,
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
        .sort({
          scheduledDate: 1,
        })
        .limit(5),

      Revision.find({
        user: req.user._id,
        completedAt: { $ne: null },
      })
        .populate("subject", "name color")
        .populate({
          path: "topic",
          select: "name difficulty",
        })
        .sort({
          completedAt: -1,
        })
        .limit(5),
    ]);

    const activeTodayRevisions = todayRevisions.filter(
      (revision) => revision.topic !== null,
    );
    const activeUpcomingRevisions = upcomingRevisions.filter(
      (revision) => revision.topic !== null,
    );
    const overdue = overdueCount[0]?.count || 0;
    const upcoming = upcomingCount[0]?.count || 0;

    return res.status(200).json({
      message: "Dashboard fetched successfully",
      stats: {
        totalSubjects,
        totalTopics,
        today: activeTodayRevisions.length,
        completedToday,
        overdue,
        upcoming,
        streak: req.user.streak,
        longestStreak: req.user.longestStreak,
      },
      todayRevisionCount: activeTodayRevisions.length,

      todayRevisions: activeTodayRevisions.slice(0, 5),
      subjectProgress,

      upcomingRevisions: activeUpcomingRevisions,
      recentHistory,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getDashboard };
