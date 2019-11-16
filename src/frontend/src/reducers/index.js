import { combineReducers } from "redux";

// surveys
import fetchAllSurveyReducer from "./survey/fetchAll.reducer";
import fetchOneSurveyReducer from "./survey/fetchOne.reducer";
import createSurveyReducer from "./survey/create.reducer";

// responses
import postResponseReducer from "./response/post.reducer";
import fetchAllResponsesReducer from "./response/get.reducer";

export default combineReducers({
    fetchAllSurveyReducer,
    createSurveyReducer,
    fetchOneSurveyReducer,
    postResponseReducer,
    fetchAllResponsesReducer
});
