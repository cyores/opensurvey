import {
    FETCH_RESPONSES,
    FETCH_RESPONSES_SUCCESS,
    FETCH_RESPONSES_FAILURE
} from "../../actions";

const initialState = {
    responses: [],
    isLoading: false,
    fetchError: null
};

export default function getAll(state = initialState, action) {
    switch (action.type) {
        case FETCH_RESPONSES:
            return Object.assign({}, state, {
                ...state,
                isLoading: true
            });
        case FETCH_RESPONSES_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                responses: action.payload,
                isLoading: false
            });
        case FETCH_RESPONSES_FAILURE:
            return Object.assign({}, state, {
                ...state,
                fetchError: action.payload,
                isLoading: false
            });
        default:
            return state;
    }
}
