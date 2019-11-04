const { responseService } = require("../services");
const { createResponses} = responseService;

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

module.exports = {
    postResponses
};
