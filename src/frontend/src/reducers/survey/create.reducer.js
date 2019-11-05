import {
    ADD_QUESTION,
    EDIT_QUESTION,
    DEL_QUESTION,
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
            let question = action.question;
            question.index = state.survey.questions.length + 1;
            return Object.assign({}, state, {
                ...state,
                survey: {
                    ...state.survey,
                    questions: state.survey.questions.concat(question)
                }
            });
        case EDIT_QUESTION:
            let adjustIndices = action.question.index !== action.index;
            let adjustAbove = action.question.index < action.index;
            let adjustBelow = action.question.index > action.index;
            return Object.assign({}, state, {
                ...state,
                survey: {
                    ...state.survey,
                    questions: state.survey.questions.map(question => {
                        if (question.index === action.index) {
                            return action.question;
                        } else if (
                            adjustIndices &&
                            adjustAbove &&
                            question.index === action.question.index
                        ) {
                            // the question whose index the newly edited question is taking over
                            return { ...question, index: question.index + 1 };
                        } else if (
                            adjustIndices &&
                            adjustBelow &&
                            question.index === action.question.index
                        ) {
                            // the question whose index the newly edited question is taking over
                            return { ...question, index: question.index - 1 };
                        }
                        return question;
                    })
                }
            });
        case DEL_QUESTION:
            return Object.assign({}, state, {
                ...state,
                survey: {
                    ...state.survey,
                    questions: state.survey.questions.reduce(
                        (acc, question) => {
                            if (question.index !== action.index) {
                                if (question.index < action.index) {
                                    acc.push(question);
                                } else {
                                    acc.push({
                                        ...question,
                                        index: question.index - 1
                                    });
                                }
                            }
                            return acc;
                        },
                        []
                    )
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
