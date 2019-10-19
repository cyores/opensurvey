import { ADD_SURVEY } from "../actions/index";

const initialState = {
    surveys: [{ name: "Test", desc: "A test description." }]
};

export default function surveyReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SURVEY:
            return Object.assign({}, state, {
                surveys: state.surveys.concat(action.survey)
            });
        default:
            return state;
    }
}
