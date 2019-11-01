import {
    FETCH_SURVEY,
    FETCH_SURVEY_SUCCESS,
    FETCH_SURVEY_FAILURE
} from "../../actions/index";

const initialState = {
    survey: {
        name: "",
        descrip: "",
        creation_date: "",
        open_date: "",
        close_date: "",
        author: ""
    },
    requiredQuestions: [],
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
            let requiredQuestions = action.payload.questions.reduce(
                (filtered, q) => {
                    if (q.required) {
                        filtered.push(q.id);
                    }
                    return filtered;
                },
                []
            );
            return Object.assign({}, state, {
                ...state,
                survey: action.payload,
                requiredQuestions: requiredQuestions,
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
