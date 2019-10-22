import React, { Component } from "react";
import { connect } from "react-redux";
import EmptyImg from "../images/undraw_empty.svg";

// components
import Flex from "../components/utils/Flex";
import Card from "../components/utils/Card";

// actions
import { fetchSurveys } from "../actions/index";
import Error from "../components/utils/Error";
import Hero from "../components/Hero";

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
            <>
                <Hero />
                <div className="container">
                    <h4>Open Surveys:</h4>

                    {isLoading && <p>Loading . . . </p>}

                    {error ? (
                        <Flex>
                            <Error error={error} />
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
