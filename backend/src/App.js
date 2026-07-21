const express = require("express");
const logger = require("./middlewares/logger.middleware");
const userRoutes = require("./routes/user.route");
const app = express();

app.use(logger);
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/",(req, res) => {
    res.send("Welcome to Revision Tracker API");
});

module.exports = app;
