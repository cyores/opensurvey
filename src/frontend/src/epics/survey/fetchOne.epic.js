import { Observable } from "rxjs";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import { ajax } from "rxjs/observable/dom/ajax";

import {
    FETCH_SURVEY,
    fetchSurveySuccess,
    fetchSurveyFailure
} from "../../actions/index";

const url = process.env.REACT_APP_API_URL + "/survey/";

export default function fetchOne(action$) {
    return action$
        .ofType(FETCH_SURVEY)
        .switchMap(action => {
            return ajax.getJSON(url + action.id);
        })
        .map(survey => fetchSurveySuccess(survey))
        .catch(error => Observable.of(fetchSurveyFailure(error)));
}
