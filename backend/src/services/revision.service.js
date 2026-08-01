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

  const { nextEaseFactor, nextInterval, nextRepetition, nextScheduledDate } =
    calculateNextRevision({
      easeFactor: topic.currentEaseFactor,
      interval: topic.currentInterval,
      repetition: topic.currentRepetition,
      rating,
    });

  const nextMastery = calculateMastery({
    currentMastery: topic.mastery,
    rating,
  });

  const nextRevisionNumber = topic.revisionNumber + 1;

  topic.currentEaseFactor = nextEaseFactor;
  topic.currentInterval = nextInterval;
  topic.currentRepetition = nextRepetition;
  topic.mastery = nextMastery;
  topic.totalRevisions +=1;
  topic.lastRevisedAt = revision.completedAt;

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

  await updateUserStreak({
    userId: revision.user,
    session,
  });
};

module.exports = { completeRevisionService };
