/** @format */
const cors = require("cors");
const express = require("express");
const logger = require("./middlewares/logger.middleware");
const userRoutes = require("./routes/user.route");
const subjectRoutes = require("./routes/subject.route");
const topicRoutes = require("./routes/topic.route");
const revisionRoutes = require("./routes/revision.route");
const dashboardRoutes = require("./routes/dashboard.route");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/revisions", revisionRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Revision Tracker API");
});

app.use("*", (req, res) => {
  return res.status(404).json({
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  return res.status(500).json({
    message: "Internal Server Error",
  });
});
module.exports = app;
