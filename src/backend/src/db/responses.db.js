const db = require("./db");
const pgformat = require("pg-format");

/**
 * Create Responses.
 * Inserts responses into the responses table
 *
 * @param {Array} responses Array of all arrays of responses (ex. [[surveyID, questionID, text]])
 *
 * @return Result of the query
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

module.exports = {
    createResponses
};
