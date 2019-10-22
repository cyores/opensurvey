const db = require("./db");

const createQuestion = async (
    surveyID,
    qtitle,
    qdesc,
    qtype,
    qweight,
    isRequired
) => {
    try {
        let qresult = await db.query(
            "INSERT INTO questions (surveyID, qtitle, qdesc, qtype, qweight, isRequired) VALUES ($1, $2, $3, $4, $5)",
            [surveyID, qtitle, qdesc, qtype, qweight, isRequired]
        );
        return qresult;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createQuestion
};
