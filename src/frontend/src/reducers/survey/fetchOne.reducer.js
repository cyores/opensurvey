import {
    FETCH_SURVEY,
    FETCH_SURVEY_SUCCESS,
    FETCH_SURVEY_FAILURE,
} from "../../actions/index";

const initialState = {
    survey: null,
    isLoading: false,
    fetchError: null
};

export default function fetchAll(state = initialState, action) {
    switch (action.type) {
        case FETCH_SURVEY:
            return {
                ...state,
                isLoading: true
            };
        case FETCH_SURVEY_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                survey: action.payload,
                isLoading: false
            });
        case FETCH_SURVEY_FAILURE:
            return Object.assign({}, state, {
                ...state,
                fetchError: action.payload,
                isLoading: false
            });
        default:
            return state;
    }
}
