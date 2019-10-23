import { Observable } from "rxjs";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import { ajax } from "rxjs/observable/dom/ajax";

import {
    FETCH_SURVEYS, // type we're watching for
    fetchSurveysSuccess, // actions we will dispatch at the right time
    fetchSurveysFailure // actions we will dispatch at the right time
} from "../../actions/index";

const url = process.env.REACT_APP_API_URL + "/surveys";

export default function fetchSurveysEpic(action$) {
    // action$ is a stream of actions
    return action$
        .ofType(FETCH_SURVEYS)
        .switchMap(() => {
            return ajax.getJSON(url);
        })
        .map(surveys => fetchSurveysSuccess(surveys))
        .catch(error => Observable.of(fetchSurveysFailure(error)));
}
