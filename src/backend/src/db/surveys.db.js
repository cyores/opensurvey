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
    try {
        let qresult = await db.query("SELECT * FROM surveys WHERE id=$1", [id]);
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
