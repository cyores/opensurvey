const db = require("./db");
const pgformat = require("pg-format");

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

const getAllSurveys = async () => {
    try {
        let qresult = await db.query(
            "SELECT * FROM surveys ORDER BY creation_date DESC"
        );
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

const getSurvey = async id => {
    //     SELECT
    //     surveys.id AS survey_id,
    //     questions.id AS question_id,
    //     possible_answers.id AS possible_answers_id,
    //     surveys.name,
    //     surveys.descrip,
    //     surveys.author,
    //     surveys.creation_date,
    //     surveys.open_date,
    //     surveys.close_date,
    //     questions.qtext,
    //     questions.qdesc,
    //     questions.qtype,
    //     possible_answers.atext,
    //     possible_answers.avalue
    // FROM surveys
    //     JOIN questions
    //         ON surveys.id = questions.survey_id
    //     LEFT OUTER JOIN possible_answers
    //         ON questions.id = possible_answers.question_id
    // WHERE surveys.id = 7;
    try {
        // let qresult = await db.query("SELECT * FROM surveys WHERE id=$1", [id]);
        // return qresult.rows[0];
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
