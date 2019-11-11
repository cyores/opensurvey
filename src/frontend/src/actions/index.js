// SURVEYS FETCH ALL
export const FETCH_SURVEYS = "FETCH_SURVEYS";
export const FETCH_SURVEYS_SUCCESS = "FETCH_SURVEYS_SUCCESS";
export const FETCH_SURVEYS_FAILURE = "FETCH_SURVEYS_FAILURE";

export const fetchSurveys = params => ({ type: FETCH_SURVEYS, params });

export const fetchSurveysSuccess = payload => ({
    type: FETCH_SURVEYS_SUCCESS,
    payload: payload
});

export const fetchSurveysFailure = error => ({
    type: FETCH_SURVEYS_FAILURE,
    payload: error
});

// SURVEYS FETCH ONE
export const FETCH_SURVEY = "FETCH_SURVEY";
export const FETCH_SURVEY_SUCCESS = "FETCH_SURVEY_SUCCESS";
export const FETCH_SURVEY_FAILURE = "FETCH_SURVEY_FAILURE";

export const fetchSurvey = id => ({ type: FETCH_SURVEY, id });

export const fetchSurveySuccess = payload => ({
    type: FETCH_SURVEY_SUCCESS,
    payload: payload
});

export const fetchSurveyFailure = error => ({
    type: FETCH_SURVEY_FAILURE,
    payload: error
});

// SURVEYS POST
export const POST_SURVEY = "POST_SURVEYS";
export const POST_SURVEY_SUCCESS = "POST_SURVEYS_SUCCESS";
export const POST_SURVEY_FAILURE = "POST_SURVEYS_FAILURE";

export const postSurvey = survey => ({ type: POST_SURVEY, survey });

export const postSurveySuccess = error => ({
    type: POST_SURVEY_SUCCESS,
    payload: error
});

export const postSurveyFailure = error => ({
    type: POST_SURVEY_FAILURE,
    payload: error
});

// SURVEY CREATE
export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION = "EDIT_QUESTION";
export const DEL_QUESTION = "DEL_QUESTION";
export const UPDATE_SURVEY = "UPDATE_SURVEY";
export const REFRESH_SURVEY = "REFRESH_SURVEY";

export const addQuestion = question => ({ type: ADD_QUESTION, question });
export const editQuestion = (question, index) => ({
    type: EDIT_QUESTION,
    question,
    index
});
export const delQuestion = index => ({ type: DEL_QUESTION, index });
export const updateSurvey = survey => ({ type: UPDATE_SURVEY, survey });
export const refreshSurvey = () => ({ type: REFRESH_SURVEY });

// RESPONSE POST
export const POST_RESPONSE = "POST_RESPONSES";
export const POST_RESPONSE_SUCCESS = "POST_RESPONSES_SUCCESS";
export const POST_RESPONSE_FAILURE = "POST_RESPONSES_FAILURE";
export const REFRESH_RESPONSE = "REFRESH_RESPONSE";

export const postResponse = response => ({ type: POST_RESPONSE, response });

export const postResponseSuccess = error => ({
    type: POST_RESPONSE_SUCCESS,
    payload: error
});

export const postResponseFailure = error => ({
    type: POST_RESPONSE_FAILURE,
    payload: error
});

export const refreshResponse = () => ({ type: REFRESH_RESPONSE });
