import {
    FETCH_SURVEYS,
    FETCH_SURVEYS_SUCCESS,
    FETCH_SURVEYS_FAILURE,
    POST_SURVEY,
    POST_SURVEY_SUCCESS,
    POST_SURVEY_FAILURE
} from "../actions/index";

const initialState = {
    surveys: [],
    isLoading: false,
    isPosting: false,
    fetchError: null,
    postError: null,
    postSuccess: false
};

export default function surveyReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_SURVEYS_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                surveys: action.payload,
                isLoading: false
            });
        case FETCH_SURVEYS_FAILURE:
            return Object.assign({}, state, {
                ...state,
                fetchError: action.payload,
                isLoading: false
            });
        case POST_SURVEY:
            return {
                ...state,
                isPosting: true
            };
        case POST_SURVEY_SUCCESS:
            console.log("post success", action.payload);
            return Object.assign({}, state, {
                ...state,
                isPosting: false,
                postSuccess: true
            });
        case POST_SURVEY_FAILURE:
            console.log("post fail", action.payload);
            return Object.assign({}, state, {
                ...state,
                postError: action.payload,
                isPosting: false
            });
        default:
            return state;
    }
}
