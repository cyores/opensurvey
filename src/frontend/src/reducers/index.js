import { combineReducers } from "redux";

import fetchSurveyReducer from "./survey/fetch.reducer";
import createSurveyReducer from "./survey/create.reducer";

export default combineReducers({ fetchSurveyReducer, createSurveyReducer });
