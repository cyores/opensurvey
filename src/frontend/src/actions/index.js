// SURVEYS FETCH
export const FETCH_SURVEYS = "FETCH_SURVEYS";
export const FETCH_SURVEYS_SUCCESS = "FETCH_SURVEYS_SUCCESS";
export const FETCH_SURVEYS_FAILURE = "FETCH_SURVEYS_FAILURE";

export const fetchSurveys = () => ({ type: FETCH_SURVEYS });

export const fetchSurveysSuccess = surveys => ({
    type: FETCH_SURVEYS_SUCCESS,
    payload: surveys
});

export const fetchSurveysFailure = surveys => ({
    type: FETCH_SURVEYS_FAILURE,
    payload: surveys
});

// SURVEYS POST
export const POST_SURVEY = "POST_SURVEYS";
export const POST_SURVEY_SUCCESS = "POST_SURVEYS_SUCCESS";
export const POST_SURVEY_FAILURE = "POST_SURVEYS_FAILURE";

export const postSurvey = survey => ({ type: POST_SURVEY, survey });

export const postSurveySuccess = survey => ({
    type: POST_SURVEY_SUCCESS,
    payload: survey
});

export const postSurveyFailure = survey => ({
    type: POST_SURVEY_FAILURE,
    payload: survey
});

// SURVEY CREATE
export const ADD_QUESTION = "ADD_QUESTION";
export const UPDATE_SURVEY = "UPDATE_SURVEY";

export const addQuestion = question => ({ type: ADD_QUESTION, question });
export const updateSurvey = survey => ({ type: UPDATE_SURVEY, survey });
