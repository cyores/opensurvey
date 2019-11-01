const { responsesDB } = require("../db/index");

/**
 * Create Responses
 * Takes in an array of objects and stores them in the database. Objects are of the form: {surveyID, questionID, text}
 *
 * @param {Array} responses
 */
const createResponses = async responses => {
    try {
        // format responses for db
        let formattedResArray = [];
        responses.forEach(response => {
            if (response.text) {
                formattedResArray.push(Object.values(response));
            }
        });
        if (formattedResArray.length > 0) {
            return await responsesDB.createResponses(formattedResArray);
        } else {
            throw new Error("No valid responses received");
        }
    } catch (err) {
        throw new Error(err.message);
    }
};

module.exports = {
    createResponses
};
