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
 * Gets the surveys matching specific parameters.
 *
 * @param {string} search Matches with survey names.
 * @param {Array} filter Filters results by open, openingsoon, closed, closingsoon.
 * @param {string} sort Sorts results by new, old, or alphabetical
 * @return {Array} Surveys matching specific parameters.
 */
const getAllSurveys = async (search, filter, sort) => {
    try {
        let logicOP = ["AND", "OR"];
        let q = `SELECT 
            surveys.id AS id,
            name AS name, 
            descrip AS desc, 
            author AS author, 
            creation_date AS creationDate, 
            open_date AS openDate, 
            close_date AS closeDate, 
            COUNT(questions.survey_id) AS numquestions 
            FROM surveys 
            LEFT JOIN questions ON (surveys.id = questions.survey_id) 
            WHERE name ILIKE $1
            ${
                filter.includes("open")
                    ? ` ${
                          logicOP[Math.min(filter.indexOf("open"), 1)]
                      } (surveys.open_date < CURRENT_TIMESTAMP OR surveys.open_date IS null)`
                    : ""
            }
            ${
                filter.includes("closed")
                    ? ` ${
                          logicOP[Math.min(filter.indexOf("closed"), 1)]
                      } (surveys.close_date < CURRENT_TIMESTAMP OR surveys.open_date > CURRENT_TIMESTAMP)`
                    : ""
            }
            ${
                filter.includes("openingsoon")
                    ? ` ${
                          logicOP[Math.min(filter.indexOf("openingsoon"), 1)]
                      } (surveys.open_date - interval '14 days' < CURRENT_TIMESTAMP AND NOT surveys.open_date < CURRENT_TIMESTAMP)`
                    : ""
            }
            ${
                filter.includes("closingsoon")
                    ? ` ${
                          logicOP[Math.min(filter.indexOf("open"), 1)]
                      }  (surveys.close_date - interval '14 days' < CURRENT_TIMESTAMP AND NOT surveys.close_date < CURRENT_TIMESTAMP)`
                    : ""
            }
            GROUP BY surveys.id 
            ${sort === "new" ? "ORDER BY surveys.creation_date DESC" : ""}
            ${sort === "old" ? "ORDER BY surveys.creation_date" : ""}
            ${sort === "az" ? "ORDER BY surveys.name" : ""}
            `;

        let qresult = await db.query(q, [search + "%"]);
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

/**
 * Gets just the data about a survey (does not include questions or respones).
 *
 * @param {int} id ID of the desired survey.
 *
 * @return {Array} Result of the query.
 */
const getOnlySurvey = async id => {
    try {
        let qresult = await db.query(`SELECT * FROM surveys WHERE id = $1`, [
            id
        ]);
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createSurvey,
    getAllSurveys,
    getSurvey,
    getOnlySurvey
};
