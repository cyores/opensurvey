import { Observable } from "rxjs";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import { ajax } from "rxjs/observable/dom/ajax";

import {
    POST_SURVEY, // type we're watching for
    postSurveySuccess, // actions we will dispatch at the right time
    postSurveyFailure // actions we will dispatch at the right time
} from "../../actions/index";

const url = process.env.REACT_APP_API_URL + "/survey";

export default function postSurveyEpic(action$) {
    // action$ is a stream of actions
    return action$
        .ofType(POST_SURVEY)
        .switchMap(action => {
            return ajax.post(url, action.survey, {
                "Content-Type": "application/json"
            });
        })
        .map(res => postSurveySuccess(res))
        .catch(error => Observable.of(postSurveyFailure(error)));
}
