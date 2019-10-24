const db = require("./db");

const createSurvey = async (name, desc, openDate, closeDate, imageURL, author) => {
    if (openDate === "") openDate = null;
    if (closeDate === "") closeDate = null;
    try {
        let qresult = await db.query(
            "INSERT INTO surveys (name, descrip, open_date, close_date, image_url, author) VALUES ($1, $2, $3, $4, $5, $6)",
            [name, desc, openDate, closeDate, imageURL, author]
        );
        return qresult;
    } catch (err) {
        throw err;
    }
};

const getAllSurveys = async () => {
    try {
        let qresult = await db.query("SELECT * FROM surveys");
        return qresult.rows;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createSurvey,
    getAllSurveys
};
