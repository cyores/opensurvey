const { surveysDB } = require("../db");

const createSurvey = async (name, desc, openDate, endDate, imageURL, author) => {
    try {
        return await surveysDB.createSurvey(
            name,
            desc,
            openDate,
            endDate,
            imageURL,
            author
        );
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllSurveys = async () => {
    try {
        return await surveysDB.getAllSurveys();
    } catch (err) {
        console.log("err", err.message);
        throw new Error(err.message);
    }
};

module.exports = {
    createSurvey,
    getAllSurveys
};
