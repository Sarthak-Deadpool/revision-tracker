/** @format */

// /** @format */

// const cron = require("node-cron");

// const { resetMissedStreak } = require("../services/streak.service");

// const startStreakCron = () => {
//   cron.schedule("59 23 * * *", async () => {
//     try {
//       console.log("Running reset streak cron");

//       await resetMissedStreak();
//     } catch (error) {
//         console.error("Daily streak reset failed", error);
//     }
//   });
// };

// module.exports = { startStreakCron };

const startStreakCron = () => {
  console.log("Streak cron initialized");

  cron.schedule(
    "59 23 * * *",
    async () => {
      console.log("Running reset streak cron", new Date().toISOString());

      try {
        await resetMissedStreak();
      } catch (error) {
        console.error("Daily streak reset failed", error);
      }
    },
    {
      timezone: "Asia/Kolkata",
    },
  );
};
