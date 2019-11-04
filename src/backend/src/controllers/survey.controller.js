const { surveyService } = require("../services");
const { createSurvey, getAllSurveys, getSurvey } = surveyService;

/**
 * Extracts the survey from the request body, sends it to the survey service, sends HTTP status code.
 * 
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express next function.
 */
const postSurvey = async (req, res, next) => {
    const survey = req.body;
    try {
        await createSurvey(survey);
        res.sendStatus(201);
        next();
    } catch (err) {
        res.sendStatus(500) && next(err);
    }
};

/**
 * Asks the survey service for all the surveys, sends HTTP status code.
 * 
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express next function.
 */
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

/**
 * Extracts the desired survey ID, asks the survey service for it, sends HTTP status code.
 * 
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express next function.
 */
const getOneSurvey = async (req, res, next) => {
    try {
        let id = req.params.id;
        let survey = await getSurvey(id);
        res.status(200).json(survey);
        next();
    } catch (err) {
        console.log("Error", err.message);
        res.sendStatus(500) && next(err);
    }
};

module.exports = {
    postSurvey,
    getAll,
    getOneSurvey
};
