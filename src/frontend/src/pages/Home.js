import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Flex from "../components/utils/Flex";
import Button from "../components/utils/Button";
import Card from "../components/utils/Card";

// actions
import { fetchSurveys } from "../actions/index";
import Error from "../components/utils/Error";

const mapStateToProps = state => {
    return {
        surveys: state.surveyReducer.surveys,
        isLoading: state.surveyReducer.isLoading,
        error: state.surveyReducer.error
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSurveys: () => dispatch(fetchSurveys())
    };
}

class Home extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }
    render() {
        const { surveys, isLoading, error } = this.props;
        return (
            <div className="container">
                <h1>Open Survey</h1>
                <h6 style={{ margin: 0 }}>
                    An open source tool to create public surveys to share with
                    anyone.
                </h6>
                <Button theme="primary" style={{ margin: "var(--space-sm) 0" }}>
                    Create Survey
                </Button>

                <br></br>

                <h4>Open Surveys:</h4>
                <Flex dir="rowleft">
                    {isLoading && <p>Loading . . . </p>}

                    {surveys.length > 0
                        ? surveys.map((survey, i) => (
                              <Card
                                  key={i}
                                  title={survey.name}
                                  desc={survey.desc}
                                  buttonText="View"
                              ></Card>
                          ))
                        : null}

                    {error && <Error error={error} />}
                </Flex>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
