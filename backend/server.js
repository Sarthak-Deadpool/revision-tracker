/** @format */

require("dotenv").config();

const app = require("./src/App");
const connectDB = require("./src/config/db");
const { startStreakCron } = require("./src/cron/streak.cron");

const PORT = process.env.PORT;

async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  startStreakCron();
}

startServer();
