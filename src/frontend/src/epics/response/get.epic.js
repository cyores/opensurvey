import { Observable } from "rxjs";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import { ajax } from "rxjs/observable/dom/ajax";

import {
    FETCH_RESPONSES,
    fetchResponsesSuccess,
    fetchResponsesFailure
} from "../../actions/index";

const url = process.env.REACT_APP_API_URL + "/responses/";

export default function fetchOne(action$) {
    return action$
        .ofType(FETCH_RESPONSES)
        .switchMap(action => {
            return ajax.getJSON(url + action.id);
        })
        .map(survey => fetchResponsesSuccess(survey))
        .catch(error => Observable.of(fetchResponsesFailure(error)));
}
