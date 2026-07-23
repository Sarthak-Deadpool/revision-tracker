const express = require("express");

const {createSubject, getSubjects, getSubjectById, updateSubject} = require("../controllers/subject.controller");
const {protect} = require("../middlewares/auth.middleware");


const router = express.Router();

router.post("/", protect, createSubject);
router.get("/", protect, getSubjects);
router.get("/:id", protect, getSubjectById);
router.patch("/:id", protect, updateSubject);

module.exports = router;