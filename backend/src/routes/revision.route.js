/** @format */

const express = require("express");

const { protect } = require("../middlewares/auth.middleware");
const {
  completeRevision,
  getTodayRevision,
  getRevisionHistory,
  getNextRevision
} = require("../controllers/revision.controller");

const router = express.Router();

router.get("/today", protect, getTodayRevision);
router.patch("/:revisionId/complete", protect, completeRevision);
router.get("/:topicId/revision-history", protect, getRevisionHistory );
router.get("/:topicId/next-revision", protect, getNextRevision);


module.exports = router;
