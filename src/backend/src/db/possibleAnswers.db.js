const db = require("./db");
const pgformat = require("pg-format");

/**
 * Create Possible Answers.
 * Inserts possible answers into the possible answers table
 *
 * @param {Array} possibleAnswers Array of all arrays of possible answers (ex. [[surveyid, questionid, atext, avalue, index]])
 *
 * @return Result of the query
 */
const createPossibleAnswers = async possibleAnswers => {
    try {
        let formattedQuery = pgformat(
            "INSERT INTO possible_answers (survey_id, question_id, atext, avalue, index) VALUES %L RETURNING id",
            possibleAnswers
        );
        let qresult = await db.query(formattedQuery);
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createPossibleAnswers
};
