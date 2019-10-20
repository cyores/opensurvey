import { combineEpics } from "redux-observable";

import surveyEpic from "./surveyEpic";

export const rootEpic = combineEpics(surveyEpic);
