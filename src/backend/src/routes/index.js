const express = require("express");
const { surveyController } = require("../controllers");
const { responseController } = require("../controllers");
const router = express.Router();

// survey routes
router.post("/survey", surveyController.postSurvey);
router.get("/surveys", surveyController.getAll);
router.get("/survey/:id", surveyController.getOneSurvey);

// response routes
router.post("/response", responseController.postResponses);

module.exports = router;
