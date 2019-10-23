const db = require("./db");
const pgformat = require("pg-format");

/**
 * Create Questions.
 * Inserts questions into the questions table
 *
 * @param {Array} questions Array of all arrays of questions (ex. [[qtitle, qdesc], [qtitle, qdesc]])
 *
 * @return Result of the query
 */
const createQuestions = async questions => {
    try {
        let formattedQuery = pgformat(
            "INSERT INTO questions (surveyID, qtitle, qdesc, qtype, qweight, isRequired) VALUES %L",
            questions
        );
        let qresult = await db.query(formattedQuery);
        return qresult;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createQuestions
};
