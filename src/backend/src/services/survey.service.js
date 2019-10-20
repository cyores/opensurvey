const { surveyDB } = require("../db");

const createSurvey = async name => {
    try {
        return await surveyDB.createSurvey(name);
    } catch (err) {
        console.log("err", err);
        throw new Error(err.message);
    }
};

const getAllSurveys = async () => {
    try {
        return await surveyDB.getAllSurveys();
    } catch (err) {
        console.log("err", err.message);
        throw new Error(err.message);
    }
};

module.exports = {
    createSurvey,
    getAllSurveys
};
