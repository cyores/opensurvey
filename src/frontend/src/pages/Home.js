import React, { Component } from "react";
import { connect } from "react-redux";
import EmptyImg from "../images/undraw_empty.svg";

// components
import Flex from "../components/utils/Flex";
import Card from "../components/utils/Card";
import Error from "../components/utils/Error";
import Hero from "../components/Hero";

// actions
import { fetchSurveys } from "../actions/index";

const mapStateToProps = state => {
    return {
        surveys: state.surveyReducer.surveys,
        isLoading: state.surveyReducer.isLoading,
        fetchError: state.surveyReducer.error
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
        const { surveys, isLoading, fetchError } = this.props;
        return (
            <>
                <Hero />
                <div className="container">
                    <h4>Open Surveys:</h4>

                    {isLoading && <p>Loading . . . </p>}

                    {fetchError ? (
                        <Flex>
                            <Error error={fetchError} />
                        </Flex>
                    ) : surveys.length > 0 ? (
                        <Flex dir="rowleft">
                            {surveys.map((survey, i) => (
                                <Card
                                    key={i}
                                    title={survey.name}
                                    desc={survey.desc}
                                    buttonText="View"
                                ></Card>
                            ))}
                        </Flex>
                    ) : (
                        <Flex dir="colcenter">
                            <img src={EmptyImg} width="50%" alt="Empty" />
                            <p>There are no surveys at this time</p>
                        </Flex>
                    )}
                </div>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
