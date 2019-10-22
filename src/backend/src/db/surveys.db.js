const db = require("./db");

const createSurvey = async (name, startDate, endDate, imageURL, author) => {
    try {
        let qresult = await db.query(
            "INSERT INTO surveys (name, startDate, endDate, imageURL, author) VALUES ($1, $2, $3, $4, $5)",
            [name, startDate, endDate, imageURL, author]
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
