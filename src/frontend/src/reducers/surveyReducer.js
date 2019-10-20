import {
    FETCH_SURVEYS,
    FETCH_SURVEYS_SUCCESS,
    FETCH_SURVEYS_FAILURE
} from "../actions/index";

const initialState = {
    surveys: [],
    isLoading: false,
    error: null
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
                error: action.payload,
                isLoading: false
            });
        default:
            return state;
    }
}
