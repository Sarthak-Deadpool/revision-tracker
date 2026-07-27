/** @format */

const calculateNextRevision = ({
  easeFactor,
  interval,
  repetition,
  rating,
}) => {
  let nextEaseFactor = easeFactor;
  let nextInterval = interval;
  let nextRepetition = repetition;

  switch (rating) {
    case "Again":
      nextRepetition = 0;
      nextInterval = 1;
      nextEaseFactor = Math.max(1.3, easeFactor - 0.2);
      break;

    case "Good":
      nextRepetition = repetition + 1;

      if (nextRepetition === 1) {
        nextInterval = 1;
      } else if (nextRepetition === 2) {
        nextInterval = 3;
      } else {
        nextInterval = Math.round(interval * easeFactor);
      }
      break;

    case "Easy":
      nextRepetition = repetition + 1;

      if (nextRepetition === 1) {
        nextInterval = 3;
      } else if (nextRepetition === 2) {
        nextInterval = 7;
      } else {
        nextInterval = Math.round(interval * (easeFactor + 0.15));
      }

      nextEaseFactor = Math.min(easeFactor + 0.15);
      break;

    default:
      throw new Error("Invalid rating");
  }

  const nextScheduledDate = new Date();

  nextScheduledDate.setDate(nextScheduledDate.getDate() + nextInterval);

  return {
    nextEaseFactor,
    nextInterval,
    nextRepetition,
    nextScheduledDate,
  };
};

module.exports = { calculateNextRevision };
