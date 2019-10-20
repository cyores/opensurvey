// SURVEYS
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
