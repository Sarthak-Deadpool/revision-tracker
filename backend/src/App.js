const express = require("express");
const logger = require("./middlewares/logger.middleware");
const userRoutes = require("./routes/user.route");
const subjectRoutes = require("./routes/subject.route");
const topicRoutes = require("./routes/topic.route");
const revisionRoutes = require("./routes/revision.route");




const app = express();

app.use(logger);
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/revisions",revisionRoutes);



app.get("/",(req, res) => {
    res.send("Welcome to Revision Tracker API");
});

module.exports = app;
