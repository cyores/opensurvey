import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Flex from "../components/utils/Flex";
import Button from "../components/utils/Button";
import Card from "../components/utils/Card";

// actions
import { addSurvey } from "../actions/index";

const mapStateToProps = state => {
    return {
        surveys: state.surveyReducer.surveys
    };
};

function mapDispatchToProps(dispatch) {
    return {
        addSurvey: survey => dispatch(addSurvey(survey))
    };
}

class Home extends Component {
    render() {
        const { surveys } = this.props;
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
                    {surveys.length > 0 ? (
                        surveys.map(survey => (
                            <Card
                                title={survey.name}
                                desc={survey.desc}
                                buttonText="View"
                            ></Card>
                        ))
                    ) : (
                        <p>There are no open surveys at this time.</p>
                    )}
                </Flex>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
