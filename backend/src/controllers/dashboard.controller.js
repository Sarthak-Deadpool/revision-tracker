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
        .populate("topic", "name difficulty")
        .sort({ scheduledDate: 1 }),

      Revision.countDocuments({
        user: req.user._id,
        completedAt: null,
        scheduledDate: {
          $lt: startOfToday,
        },
      }),

      Revision.countDocuments({
        user: req.user._id,
        completedAt: null,
        scheduledDate: {
          $gt: today,
        },
      }),

      Revision.countDocuments({
        user: req.user._id,
        completedAt: {
          $gte: startOfToday,
          $lte: today,
        },
      }),
    ]);

    return res.status(200).json({
      message: "Dashboard fetched successfully",
      summary: {
        totalSubjects,
        totalTopics,
        today: todayRevisions.length,
        completedToday,
        overdue: overdueCount,
        upcoming: upcomingCount,
        streak: req.user.streak,
        longestStreak: req.user.longestStreak,
      },
      todayRevisions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = { getDashboard };
