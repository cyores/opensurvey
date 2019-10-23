const db = require("./db");

const createPossibleAnswer = async (surveyID, questionID, atext, avalue) => {
    try {
        let qresult = await db.query(
            "INSERT INTO questions (surveyID, questionID, atext, avalue) VALUES ($1, $2, $3, $4)",
            [surveyID, questionID, atext, avalue]
        );
        return qresult;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createPossibleAnswer
};
