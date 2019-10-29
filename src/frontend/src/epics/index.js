import { combineEpics } from "redux-observable";

import surveyFetchAll from "./survey/fetchAll.epic";
import surveyFetchOne from "./survey/fetchOne.epic";
import surveyPost from "./survey/post.epic";

export const rootEpic = combineEpics(
    surveyFetchAll,
    surveyFetchOne,
    surveyPost
);
