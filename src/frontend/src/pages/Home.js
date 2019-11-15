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
import Spinner from "../components/utils/Spinner";

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
        fetchSurveys: params => dispatch(fetchSurveys(params))
    };
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: "grid",
            search: "",
            filter: "",
            sort: ""
        };
        this.changeLayout = this.changeLayout.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }
    componentDidMount() {
        this.props.fetchSurveys(null);
    }
    changeLayout(layout) {
        this.setState({ layout: layout });
    }
    handleFilterChange(input, param) {
        this.setState({ [param]: input.target.value }, () =>
            this.props.fetchSurveys({
                search: this.state.search,
                filter: this.state.filter,
                sort: this.state.sort
            })
        );
    }
    render() {
        const { surveys, isLoading, fetchError } = this.props;
        return (
            <>
                <HomeHero />
                <PageTransition>
                    <div className="container">
                        <FilterBar
                            changeLayout={this.changeLayout}
                            handleChange={this.handleFilterChange}
                        />
                        {isLoading && <Spinner />}

                        {fetchError ? (
                            <Flex>
                                <Error error={fetchError} />
                            </Flex>
                        ) : surveys.length > 0 ? (
                            <>
                                <Flex dir="rowleft">
                                    {this.state.layout === "grid" &&
                                        surveys.map((survey, i) => (
                                            <Card
                                                key={i}
                                                title={survey.name}
                                                desc={survey.desc}
                                                open={survey.opendate}
                                                close={survey.closedate}
                                                buttonText="Complete Survey"
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
                                                buttonText="Complete Survey"
                                                surveyID={survey.id}
                                                numQuestions={
                                                    survey.numquestions
                                                }
                                            ></SurveyList>
                                        ))}
                                </Flex>
                            </>
                        ) : (
                            !isLoading && (
                                <Flex dir="colcenter">
                                    <img
                                        src={EmptyImg}
                                        width="33%"
                                        alt="Empty"
                                    />
                                    <p>
                                        There are no surveys matching that query
                                    </p>
                                </Flex>
                            )
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
