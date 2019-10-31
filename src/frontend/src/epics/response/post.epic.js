import { Observable } from "rxjs";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/map";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import { ajax } from "rxjs/observable/dom/ajax";

import {
    POST_RESPONSE,
    postResponseSuccess,
    postResponseFailure
} from "../../actions/index";

const url = process.env.REACT_APP_API_URL + "/response";

export default function post(action$) {
    return action$
        .ofType(POST_RESPONSE)
        .switchMap(action => {
            return ajax.post(
                url,
                { responses: action.response },
                {
                    "Content-Type": "application/json"
                }
            );
        })
        .map(res => postResponseSuccess(res))
        .catch(error => Observable.of(postResponseFailure(error)));
}
