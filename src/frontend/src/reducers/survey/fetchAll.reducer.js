import {
    FETCH_SURVEYS,
    FETCH_SURVEYS_SUCCESS,
    FETCH_SURVEYS_FAILURE
} from "../../actions/index";

const initialState = {
    surveys: [],
    isLoading: false,
    fetchError: null
};

export default function fetchAll(state = initialState, action) {
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
        default:
            return state;
    }
}
