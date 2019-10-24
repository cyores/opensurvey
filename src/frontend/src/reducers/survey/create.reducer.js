import { ADD_QUESTION } from "../../actions/";

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
        default:
            return state;
    }
}
