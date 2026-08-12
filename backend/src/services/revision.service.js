/** @format */

const Topic = require("../models/topic.model");
const Revision = require("../models/revision.model");
const { calculateNextRevision } = require("../utils/scheduler.util");
const { updateUserStreak } = require("./streak.service");
const { calculateMastery } = require("../utils/calculateMastery.util");

const completeRevisionService = async ({ revision, rating, session }) => {
  revision.rating = rating;
  revision.completedAt = new Date();

  await revision.save({ session });

  const topic = await Topic.findOne({
    _id: revision.topic,
    user: revision.user,
  }).session(session);

  if (!topic) {
    throw new Error("Topic not found");
  }

  const nextMastery = Math.min(
    calculateMastery({
      currentMastery: topic.masteryLevel,
      rating,
    }),
    100,
  );

  const nextRevisionNumber = revision.revisionNumber + 1;

  topic.masteryLevel = nextMastery;
  topic.totalRevisions = nextRevisionNumber;
  topic.lastRevisedAt = revision.completedAt;

  await updateUserStreak({
    userId: revision.user,
    session,
  });

  if (nextMastery >= 100) {
    await topic.save({ session });

    return;
  }

  const { nextEaseFactor, nextInterval, nextRepetition, nextScheduledDate } =
    calculateNextRevision({
      easeFactor: topic.currentEaseFactor,
      interval: topic.currentInterval,
      repetition: topic.currentRepetition,
      rating,
    });

  topic.currentEaseFactor = nextEaseFactor;
  topic.currentInterval = nextInterval;
  topic.currentRepetition = nextRepetition;

  await topic.save({ session });

  await Revision.create(
    [
      {
        user: revision.user,
        subject: revision.subject,
        topic: topic._id,

        revisionNumber: nextRevisionNumber,
        scheduledDate: nextScheduledDate,

        completedAt: null,
        rating: null,

        easeFactor: nextEaseFactor,
        interval: nextInterval,
        repetition: nextRepetition,
      },
    ],
    { session },
  );
};

module.exports = { completeRevisionService };
