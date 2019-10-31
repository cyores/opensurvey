import {
    ADD_QUESTION,
    UPDATE_SURVEY,
    REFRESH_SURVEY,
    POST_SURVEY,
    POST_SURVEY_SUCCESS,
    POST_SURVEY_FAILURE
} from "../../actions/";

const initialState = {
    survey: {
        name: "",
        desc: "",
        author: "",
        openDate: "",
        closeDate: "",
        questions: []
    },
    isPosting: false,
    postSuccess: null,
    postError: null
};

export default function create(state = initialState, action) {
    switch (action.type) {
        case ADD_QUESTION:
            return Object.assign({}, state, {
                survey: {
                    ...state.survey,
                    questions: state.survey.questions.concat(action.question)
                }
            });
        case UPDATE_SURVEY:
            return Object.assign({}, state, {
                survey: action.survey
            });
        case REFRESH_SURVEY:
            return Object.assign({}, state, initialState);
        case POST_SURVEY:
            return Object.assign({}, state, {
                ...state,
                isPosting: true
            });
        case POST_SURVEY_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                survey: initialState.survey,
                postSuccess: true,
                isPosting: false
            });
        case POST_SURVEY_FAILURE:
            return Object.assign({}, state, {
                ...state,
                postSuccess: false,
                postError: action.payload,
                isPosting: false
            });
        default:
            return state;
    }
}
