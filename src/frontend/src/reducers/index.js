import { combineReducers } from "redux";

import fetchAllSurveyReducer from "./survey/fetchAll.reducer";
import fetchOneSurveyReducer from "./survey/fetchOne.reducer";
import createSurveyReducer from "./survey/create.reducer";

export default combineReducers({
    fetchAllSurveyReducer,
    createSurveyReducer,
    fetchOneSurveyReducer
});
