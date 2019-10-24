import { ADD_QUESTION, UPDATE_SURVEY } from "../../actions/";

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

        default:
            return state;
    }
}
