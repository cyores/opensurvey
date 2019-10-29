import React, { Component } from "react";
import { connect } from "react-redux";

// actions
import { fetchSurvey } from "../actions/index";

const mapStateToProps = state => {
    return {
        survey: state.fetchOneSurveyReducer.surveys,
        isLoading: state.fetchOneSurveyReducer.isLoading,
        fetchError: state.fetchOneSurveyReducer.error
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSurvey: id => dispatch(fetchSurvey(id))
    };
}

class Survey extends Component {
    componentDidMount() {
        this.props.fetchSurvey(this.props.match.params.id);
    }
    render() {
        return (
            <>
                <p>survey page {this.props.match.params.id}</p>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Survey);
