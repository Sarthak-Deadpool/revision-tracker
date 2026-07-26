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
router.patch("/:id/complete", protect, completeRevision);
router.get("/history/:topicId", protect, getRevisionHistory );
router.get("/next/:topicId", protect, getNextRevision);


module.exports = router;
