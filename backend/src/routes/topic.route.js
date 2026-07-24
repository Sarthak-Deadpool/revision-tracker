const express = require("express");

const {protect} = require("../middlewares/auth.middleware");
const {createTopic, getTopics, getTopicById, updateTopic, deleteTopic} = require("../controllers/topic.controller");


const router = express.Router();

router.post("/", protect, createTopic);
router.get("/", protect, getTopics);
router.get("/:id", protect, getTopicById);
router.patch("/:id", protect, updateTopic);
router.delete("/:id", protect, deleteTopic);


module.exports = router;