/** @format */

const calculateMastery = ({ currentMastery, rating }) => {
  let nextMastery = currentMastery;

  switch (rating) {
    case "Again":
      nextMastery = Math.max(0, currentMastery - 5);
      break;

    case "Good":
      nextMastery = Math.min(100, currentMastery + 3);
      break;

    case "Easy":
      nextMastery = Math.min(100, currentMastery + 5);
      break;

    default:
      throw new Error("Invalid rating");
  }

  return nextMastery;
};

module.exports = { calculateMastery };