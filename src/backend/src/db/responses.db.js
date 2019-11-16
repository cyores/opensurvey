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

/**
 * Gets all the associated responses from the database.
 *
 * @param {int} id ID of the survey you want the responses for.
 *
 * @return {Array} Array containing the responses (if any).
 */
const getResponses = async id => {
    try {
        let qresult = await db.query(
            `SELECT 
            questions.id,
            questions.qtext,
            questions.qdesc,
            questions.qtype,
            questions.qweight,
            questions.is_required,
            responses.response,
            COUNT(responses.response)
            FROM questions 
            LEFT OUTER JOIN responses ON questions.id = responses.question_id
            WHERE responses.survey_id=$1
            GROUP BY responses.response, questions.id
            ORDER BY questions.id`,
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
