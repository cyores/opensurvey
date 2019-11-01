import {
    POST_RESPONSE,
    POST_RESPONSE_SUCCESS,
    POST_RESPONSE_FAILURE,
    REFRESH_RESPONSE
} from "../../actions/";

const initialState = {
    isPosting: false,
    postSuccess: null,
    postError: null
};

export default function post(state = initialState, action) {
    switch (action.type) {
        case POST_RESPONSE:
            return Object.assign({}, state, {
                ...state,
                isPosting: true
            });
        case POST_RESPONSE_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                postSuccess: true,
                isPosting: false
            });
        case POST_RESPONSE_FAILURE:
            return Object.assign({}, state, {
                isPosting: false,
                postSuccess: false,
                postError: action.payload
            });
        case REFRESH_RESPONSE:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }
}
