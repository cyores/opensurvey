const db = require("./db");
const pgformat = require("pg-format");

/**
 * Create Questions.
 * Inserts questions into the questions table
 *
 * @param {Array} questions Array of all arrays of questions (ex. [[surveyID, qtext, qdesc, qtype, qweight, required]])
 *
 * @return Result of the query
 */
const createQuestions = async questions => {
    try {
        let formattedQuery = pgformat(
            "INSERT INTO questions (survey_id, qtext, qdesc, qtype, qweight, is_required) VALUES %L RETURNING id",
            questions
        );
        let qresult = await db.query(formattedQuery);
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createQuestions
};
