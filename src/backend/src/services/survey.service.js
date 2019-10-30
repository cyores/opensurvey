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

        if (formattedPAArray.length > 0) {
            await possibleAnswersDB.createPossibleAnswers(formattedPAArray);
        }

        return 1;
    } catch (err) {
        throw new Error(err.message);
    }
};

const getAllSurveys = async () => {
    try {
        return await surveysDB.getAllSurveys();
    } catch (err) {
        throw new Error(err.message);
    }
};

const getSurvey = async id => {
    try {
        // return await surveysDB.getSurvey(id);
        let rows = await surveysDB.getSurvey(id);
        let survey = {
            name: rows[0].name,
            descrip: rows[0].descrip,
            creation_date: rows[0].creation_date,
            open_date: rows[0].open_date,
            close_date: rows[0].close_date,
            author: rows[0].author,
            questions: []
        };
        let currQid = -1;
        let currQ = null;
        rows.forEach(row => {
            if (row.question_id !== currQid) {
                if (currQ) {
                    survey.questions.push(currQ);
                }
                currQid = row.question_id;
                currQ = {
                    id: row.question_id,
                    qtext: row.qtext,
                    qtype: row.qtype,
                    qdesc: row.qdesc,
                    possibleAnswers: []
                };
            }

            if (currQ.qtype !== "text") {
                let pa = {
                    atext: row.atext,
                    avalue: row.avalue
                };
                currQ.possibleAnswers.push(pa);
            }
        });
        // push the last question
        survey.questions.push(currQ);
        return survey;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    createSurvey,
    getAllSurveys,
    getSurvey
};
