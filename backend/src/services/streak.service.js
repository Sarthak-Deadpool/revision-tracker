/** @format */

const Revision = require("../models/revision.model");
const User = require("../models/user.model");

const updateUserStreak = async ({ userId, session }) => {
  const endOfToday = new Date();
  endOfToday.setHours(11, 59, 59, 999);

  const pendingRevisionCount = await Revision.aggregate([
    {
      $match: {
        user: userId,
        completedAt: null,
        scheduledDate: {
          $lte: endOfToday,
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
  ]);

  const count = pendingRevisionCount[0]?.count || 0;

  if (count > 0) {
    return;
  }

  const user = await User.findById(userId).session(session);

  if (!user) {
    throw new Error("User not found");
  }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  if (user.lastStreakDate && user.lastStreakDate >= startOfToday) {
    return;
  }

  user.streak += 1;
  user.longestStreak = Math.max(user.longestStreak, user.streak);
  user.lastStreakDate = new Date();

  await user.save({ session });
};

const resetMissedStreak = async () => {
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const usersWithPendingRevisions = await Revision.aggregate([
    {
      $match: {
        completedAt: null,
        scheduledDate: {
          $lte: endOfToday,
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
      $group: {
        _id: "$user",
      },
    },
  ]);

  if (usersWithPendingRevisions.length === 0) {
    return;
  }

  const userIds = usersWithPendingRevisions.map((user) => user._id);

  await User.updateMany(
    {
      _id: {
        $in: userIds,
      },
    },
    {
      $set: {
        streak: 0,
        lastStreakDate: null,
      },
    },
  );
};

module.exports = { updateUserStreak, resetMissedStreak };
