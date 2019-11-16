const { responsesDB } = require("../db/index");

/**
 * Formats the responses into a way the db file is expecting.
 *
 * @param {Array} responses Array of objects of the form {surveyID, questionID, text}.
 * @returns {Array} The result of the responses.db call (array of created responses IDs).
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

/**
 * Calls the db file to get all the responses for this survey, formats them, return them.
 *
 * @param {int} id ID of the survey you want the responses for.
 *
 * @return {Array} Array containing the responses (if any).
 */
const getResponses = async id => {
    try {
        let responses = await responsesDB.getResponses(id);
        if (responses.length === 0) return responses;
        let formatted = [];
        let currQid = -1;
        let question = null;
        responses.forEach(res => {
            if (res.id !== currQid) {
                if (question) formatted.push(question);
                question = {
                    qtext: res.qtext,
                    qdesc: res.qdesc,
                    qtype: res.qtype,
                    qweight: res.qweight,
                    is_required: res.is_required,
                    responses: {
                        [res.response]: res.count
                    }
                };
            } else {
                question.responses[res.response] = res.count;
            }
            currQid = res.id;
        });
        formatted.push(question);
        return formatted;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createResponses,
    getResponses
};
