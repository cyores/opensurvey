const { surveysDB } = require("../db/index");
const { questionsDB } = require("../db/index");
const { possibleAnswersDB } = require("../db/index");

const createSurvey = async survey => {
    try {
        // extract survey info
        const { name, desc, author, openDate, closeDate } = survey;
        const strippedSurvey = { name, desc, author, openDate, closeDate };

        let surveyID = await surveysDB.createSurvey(strippedSurvey);

        // format questions for db
        let formattedQArray = [];
        survey.questions.forEach(q => {
            const { qtext, qdesc, qtype, qweight, required } = q;
            formattedQArray.push([
                surveyID,
                qtext,
                qdesc,
                qtype.toLowerCase(),
                qweight,
                required
            ]);
        });

        let questionIDs = await questionsDB.createQuestions(formattedQArray);

        // format possible answers for db
        let formattedPAArray = [];
        survey.questions.forEach((q, i) => {
            if (q.possibleAnswers.length > 0) {
                q.possibleAnswers.forEach(pa => {
                    const { atext, avalue, index } = pa;
                    formattedPAArray.push([
                        surveyID,
                        questionIDs[i].id,
                        atext,
                        avalue,
                        index
                    ]);
                });
            }
        });
        console.log("fpa", formattedPAArray);

        return await possibleAnswersDB.createPossibleAnswers(formattedPAArray);
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
