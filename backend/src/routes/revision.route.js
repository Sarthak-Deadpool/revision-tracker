const express = require("express");

const {protect} = require("../middlewares/auth.middleware");
const {completeRevision} = require("../controllers/revision.controller");



const router = express.Router();

router.patch("/:id/complete", protect, completeRevision);

module.exports = router;