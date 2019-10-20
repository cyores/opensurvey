const db = require("./db");

const createSurvey = async name => {
    try {
        let qresult = await db.query("INSERT INTO surveys (name) VALUES ($1)", [
            name
        ]);
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
