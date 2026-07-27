/** @format */

const express = require("express");

const { protect } = require("../middlewares/auth.middleware");
const {
  createTopic,
  getTopics,
  getTopicById,
  updateTopic,
  deleteTopic,
  archivedTopic,
  unarchiveTopic,
  getArchivedTopics,
} = require("../controllers/topic.controller");

const router = express.Router();

router.post("/", protect, createTopic);
router.get("/", protect, getTopics);
router.get("/archive", protect, getArchivedTopics);
router.get("/:id", protect, getTopicById);
router.patch("/:id", protect, updateTopic);
router.delete("/:id", protect, deleteTopic);
router.patch("/:topicId/archive", protect, archivedTopic);
router.patch("/:topicId/unarchive", protect, unarchiveTopic);


module.exports = router;
