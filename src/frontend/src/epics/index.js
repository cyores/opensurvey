import { combineEpics } from "redux-observable";

// survey
import surveyFetchAll from "./survey/fetchAll.epic";
import surveyFetchOne from "./survey/fetchOne.epic";
import surveyPost from "./survey/post.epic";

// response
import responsePost from "./response/post.epic";

export const rootEpic = combineEpics(
    surveyFetchAll,
    surveyFetchOne,
    surveyPost,
    responsePost
);
