import {
    ADD_QUESTION,
    UPDATE_SURVEY,
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
    }
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
        case POST_SURVEY:
            console.log("reducer post survey");
            return state;
        case POST_SURVEY_SUCCESS:
            console.log("reducer post survey succ");
            return state;
        case POST_SURVEY_FAILURE:
            console.log("reducer post survey fail");
            return state;
        default:
            return state;
    }
}
