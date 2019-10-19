// SURVEYS
export const ADD_SURVEY = "ADD_SURVEY";

export function addSurvey(survey) {
    return { type: ADD_SURVEY, survey };
}
