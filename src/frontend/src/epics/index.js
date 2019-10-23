import { combineEpics } from "redux-observable";

import surveyFetch from "./survey/surveyFetch.epic";
import surveyPost from "./survey/surveyPost.epic";

export const rootEpic = combineEpics(surveyFetch, surveyPost);
