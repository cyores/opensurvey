import React, { Component } from "react";
import { connect } from "react-redux";
import EmptyImg from "../images/undraw_empty.svg";

// components
import Flex from "../components/utils/Flex";
import Card from "../components/utils/Card";
import Error from "../components/utils/Error";
import HomeHero from "../components/HomeHero";
import PageTransition from "../components/utils/PageTransition";
import FilterBar from "../components/FilterBar";
import SurveyList from "../components/SurveyList";

// actions
import { fetchSurveys } from "../actions/index";

const mapStateToProps = state => {
    return {
        surveys: state.fetchAllSurveyReducer.surveys,
        isLoading: state.fetchAllSurveyReducer.isLoading,
        fetchError: state.fetchAllSurveyReducer.fetchError
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSurveys: () => dispatch(fetchSurveys())
    };
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: "grid"
        };
        this.changeLayout = this.changeLayout.bind(this);
    }
    componentDidMount() {
        this.props.fetchSurveys();
    }
    changeLayout(layout) {
        this.setState({ layout: layout });
    }
    render() {
        const { surveys, isLoading, fetchError } = this.props;
        return (
            <>
                <HomeHero />
                <PageTransition>
                    <div className="container">
                        {isLoading && <p>Loading . . . </p>}

                        {fetchError ? (
                            <Flex>
                                <Error error={fetchError} />
                            </Flex>
                        ) : surveys.length > 0 ? (
                            <>
                                <FilterBar changeLayout={this.changeLayout} />
                                <Flex dir="rowleft">
                                    {this.state.layout === "grid" &&
                                        surveys.map((survey, i) => (
                                            <Card
                                                key={i}
                                                title={survey.name}
                                                desc={survey.desc}
                                                open={survey.opendate}
                                                close={survey.closedate}
                                                buttonText="View"
                                                surveyID={survey.id}
                                                numQuestions={
                                                    survey.numquestions
                                                }
                                            ></Card>
                                        ))}
                                    {this.state.layout === "list" &&
                                        surveys.map((survey, i) => (
                                            <SurveyList
                                                key={i}
                                                title={survey.name}
                                                desc={survey.desc}
                                                open={survey.opendate}
                                                close={survey.closedate}
                                                buttonText="View"
                                                surveyID={survey.id}
                                                numQuestions={
                                                    survey.numquestions
                                                }
                                            ></SurveyList>
                                        ))}
                                </Flex>
                            </>
                        ) : (
                            <Flex dir="colcenter">
                                <img src={EmptyImg} width="50%" alt="Empty" />
                                <p>There are no surveys at this time</p>
                            </Flex>
                        )}
                    </div>
                </PageTransition>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
