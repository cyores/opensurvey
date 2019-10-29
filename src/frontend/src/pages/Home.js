import React, { Component } from "react";
import { connect } from "react-redux";
import EmptyImg from "../images/undraw_empty.svg";

// components
import Flex from "../components/utils/Flex";
import Card from "../components/utils/Card";
import Error from "../components/utils/Error";
import HomeHero from "../components/HomeHero";

// actions
import { fetchSurveys } from "../actions/index";

const mapStateToProps = state => {
    return {
        surveys: state.fetchAllSurveyReducer.surveys,
        isLoading: state.fetchAllSurveyReducer.isLoading,
        fetchError: state.fetchAllSurveyReducer.error
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
                <HomeHero />
                <div className="container">
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
                                    desc={survey.descrip}
                                    open={survey.open_date}
                                    close={survey.close_date}
                                    buttonText="View"
                                    surveyID={survey.id}
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
