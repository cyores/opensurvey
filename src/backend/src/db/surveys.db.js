const db = require("./db");

/**
 * Inserts a survey in the database.
 *
 * @param {Object} survey Survey object of the form {name, openDate, closeDate, desc, author, imageURL}.
 * @return {int} Database ID of the survey just created.
 */
const createSurvey = async survey => {
    const { name, desc, author, imageURL } = survey;
    let { openDate, closeDate } = survey;
    if (openDate === "") openDate = null;
    if (closeDate === "") closeDate = null;

    try {
        let qresult = await db.query(
            "INSERT INTO surveys (name, descrip, author, open_date, close_date, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
            [name, desc, author, openDate, closeDate, imageURL]
        );
        return qresult.rows[0].id;
    } catch (err) {
        throw err;
    }
};

/**
 * Gets all the surveys from the database.
 * 
 * @return {Array} Array of all surveys.
 */
const getAllSurveys = async () => {
    try {
        let q =
            "SELECT " +
            "surveys.id AS id, " +
            "name AS name, " +
            "descrip AS desc, " +
            "author AS author, " +
            "creation_date AS creationDate, " +
            "open_date AS openDate, " +
            "close_date AS closeDate, " +
            "COUNT(questions.survey_id) AS numquestions " +
            "FROM surveys " +
            "LEFT JOIN questions ON (surveys.id = questions.survey_id) " +
            "GROUP BY surveys.id " +
            "ORDER BY surveys.creation_date DESC";
        let qresult = await db.query(q);
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

/**
 * Get the desired survey (including questions and possible answers) from the database.
 * 
 * @param {int} id ID of the desired survey.
 * @return {Array} Each rows represents a possible answers but also contains the survey and related question data.
 */
const getSurvey = async id => {
    try {

        let q =
            "SELECT " +
            "surveys.id AS survey_id, " +
            "questions.id AS question_id, " +
            "possible_answers.id AS possible_answers_id, " +
            "surveys.name, " +
            "surveys.descrip, " +
            "surveys.author, " +
            "surveys.creation_date, " +
            "surveys.open_date, " +
            "surveys.close_date, " +
            "questions.qtext, " +
            "questions.qdesc, " +
            "questions.qtype, " +
            "questions.is_required, " +
            "possible_answers.atext, " +
            "possible_answers.avalue " +
            "FROM surveys " +
            "JOIN questions ON surveys.id = questions.survey_id " +
            "LEFT OUTER JOIN possible_answers " +
            "ON questions.id = possible_answers.question_id " +
            "WHERE surveys.id = $1 " +
            "ORDER BY questions.id";

        let qresult = await db.query(q, [id]);
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createSurvey,
    getAllSurveys,
    getSurvey
};
