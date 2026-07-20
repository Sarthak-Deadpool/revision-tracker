const express = require("express");
const app = express();

app.get("/",(req, res) => {
    res.send("Welcome to Revision Tracker API");
});

module.exports = app;
