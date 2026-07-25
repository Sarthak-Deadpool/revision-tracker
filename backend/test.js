/** @format */

const { calculateNextRevisionDate } = require("./src/utils/scheduler.util");

console.log(
  calculateNextRevisionDate({
    easeFactor: 2.5,
    interval: 0,
    repetition: 0,
    rating: "Good",
  }),
);

console.log(
  calculateNextRevisionDate({
    easeFactor: 2.5,
    interval: 1,
    repetition: 1,
    rating: "Easy",
  }),
);

console.log(
  calculateNextRevisionDate({
    easeFactor: 2.5,
    interval: 3,
    repetition: 2,
    rating: "Again",
  }),
);