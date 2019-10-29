import { Observable } from "rxjs";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import { ajax } from "rxjs/observable/dom/ajax";

import {
    FETCH_SURVEYS,
    fetchSurveysSuccess,
    fetchSurveysFailure
} from "../../actions/index";

const url = process.env.REACT_APP_API_URL + "/surveys";

export default function fetchAll(action$) {
    return action$
        .ofType(FETCH_SURVEYS)
        .switchMap(() => {
            return ajax.getJSON(url);
        })
        .map(surveys => fetchSurveysSuccess(surveys))
        .catch(error => Observable.of(fetchSurveysFailure(error)));
}
