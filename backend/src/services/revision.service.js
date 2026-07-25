/** @format */

const Topic = require("../models/topic.model");
const Revision = require("../models/revision.model");
const { calculateNextRevision } = require("../utils/scheduler.util");

const completeRevisionService = async ({ revision, rating, session }) => {
  revision.rating = rating;
  revision.completedAt = new Date();

  await revision.save({ session });

  const topic = await Topic.findOne({
    _id: revision.topic,
    user: revision.user,
  }).session(session);

  if (!topic) {
    throw new Error("Topic not Found");
  }

  const { nextEaseFactor, nextInterval, nextRepetition, nextScheduleDate } =
    calculateNextRevision({
      easeFactor: topic.currentEaseFactor,
      interval: topic.currentInterval,
      repetition: topic.currentRepetition,
      rating,
    });

  const nextRevisionNumber = revision.revisionNumber + 1;

  topic.currentEaseFactor = nextEaseFactor;
  topic.currentInterval = nextInterval;
  topic.currentRepetition = nextRepetition;

  topic.totalRevisions +=1  ;
  topic.lastRevisedAt = revision.completedAt;

  await topic.save({session});
};

module.exports = { completeRevisionService };
