const db = require("./db");
const pgformat = require("pg-format");

/**
 * Inserts responses into the responses table.
 *
 * @param {Array} responses Array of all arrays of responses (ex. [[surveyID, questionID, text]])
 *
 * @return {Array} Array containing the ID of all responses just created.
 */
const createResponses = async responses => {
    try {
        let formattedQuery = pgformat(
            "INSERT INTO responses (survey_id, question_id, response) VALUES %L RETURNING id",
            responses
        );
        let qresult = await db.query(formattedQuery);
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

const getResponses = async id => {
    try {
        let qresult = await db.query(
            "SELECT * FROM responses WHERE survey_id = $1",
            [id]
        );
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createResponses,
    getResponses
};
