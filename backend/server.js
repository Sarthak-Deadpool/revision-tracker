/** @format */

require("dotenv").config();

const app = require("./src/App");
const connectDB = require("./src/config/db");
const { startStreakCron } = require("./src/cron/streak.cron");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    startStreakCron();
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
