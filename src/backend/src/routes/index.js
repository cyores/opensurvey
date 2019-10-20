const express = require("express");
const { surveyController } = require("../controllers");
const router = express.Router();

router.post("/survey", surveyController.postSurvey);
router.get("/surveys", surveyController.getAll);

module.exports = router;
