const { responseService } = require("../services");
const { createResponses, getResponses } = responseService;

/**
 * Extracts the response from request body, sends it to the response service, sends HTTP status code.
 *
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express next function.
 */
const postResponses = async (req, res, next) => {
    const responses = req.body.responses;
    try {
        await createResponses(responses);
        res.sendStatus(201);
        next();
    } catch (err) {
        res.sendStatus(500) && next(err);
    }
};

/**
 * Extracts survey id from request params and calls the service to get respones from the survey.
 *
 * @param {Object} req Express request object.
 * @param {Object} res Express response object.
 * @param {Function} next Express next function.
 *
 * @return {Array} Array containing the responses (if any).
 */
const getSurveyResponses = async (req, res, next) => {
    try {
        let id = req.params.id;
        let responses = await getResponses(id);
        res.status(200).json(responses);
        next();
    } catch (err) {
        console.log("Error", err.message);
        res.sendStatus(500) && next(err);
    }
};

module.exports = {
    postResponses,
    getSurveyResponses
};
