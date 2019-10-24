const { surveyService } = require("../services");
const { createSurvey, getAllSurveys } = surveyService;

const postSurvey = async (req, res, next) => {
    const { name, desc, openDate, closeDate, imageURL, author } = req.body;
    try {
        await createSurvey(name, desc, openDate, closeDate, imageURL, author);
        res.sendStatus(201);
        next();
    } catch (err) {
        res.sendStatus(500) && next(err);
    }
};

const getAll = async (req, res, next) => {
    try {
        let surveys = await getAllSurveys();
        res.status(200).json(surveys);
        next();
    } catch (err) {
        console.log("Error", err.message);
        res.sendStatus(500) && next(err);
    }
};

module.exports = {
    postSurvey,
    getAll
};
