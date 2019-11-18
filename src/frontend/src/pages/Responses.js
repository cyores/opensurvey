import React, { Component } from "react";
import { connect } from "react-redux";
import { checkDates } from "../utils/index";

// actions
import { fetchResponses } from "../actions/index";
import { FiClock } from "react-icons/fi";

// components
import Flex from "../components/utils/Flex";
import Error from "../components/utils/Error";
import Spinner from "../components/utils/Spinner";
import PageTransition from "../components/utils/PageTransition";
import BarGraph from "../components/utils/BarGraph";

const mapStateToProps = state => {
    return {
        data: state.fetchAllResponsesReducer.data
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchResponses: id => dispatch(fetchResponses(id))
    };
}
class Responses extends Component {
    componentDidMount() {
        this.props.fetchResponses(this.props.match.params.id);
    }

    formatForGraph(responses) {
        let formatted = [];
        Object.entries(responses).forEach(([response, count]) => {
            formatted.push({ key: response, value: count });
        });
        console.log(formatted);
        return formatted;
    }

    render() {
        const { data, isLoading, fetchError } = this.props;
        const { survey, questions } = data;
        const { dateText, dateColor } = checkDates(
            survey.open_date,
            survey.close_date
        );

        if (isLoading) {
            return (
                <div className="container">
                    <Spinner />
                </div>
            );
        }

        if (fetchError) {
            return (
                <div className="container">
                    <Flex>
                        <Error error={fetchError} />
                    </Flex>
                </div>
            );
        }
        return (
            <PageTransition>
                <div className="container">
                    <Flex>
                        <div style={{ flex: "66 0 300px" }}>
                            <h2>RESULTS: {survey.name}</h2>
                        </div>
                        <div style={{ flex: "33 0 150px" }}>
                            <p
                                style={{
                                    fontWeight: 700,
                                    float: "right",
                                    color: dateColor
                                }}
                            >
                                <FiClock style={{ padding: "0 2px" }} />
                                {dateText}
                            </p>
                        </div>
                    </Flex>

                    {survey.descrip.length > 0 && <p>{survey.descrip}</p>}
                    {survey.author.length > 0 && (
                        <p>
                            Survey Author: <b>{survey.author}</b>
                        </p>
                    )}
                    <hr></hr>
                    {questions.length === 0 ? (
                        <p>There are no responses to this survey.</p>
                    ) : (
                        questions.map((question, i) => (
                            <div key={`qres-${i}`}>
                                <h6 style={{ margin: 0 }}>
                                    Question {i + 1}{" "} Results
                                    {question.required && (
                                        <span
                                            style={{
                                                color: "var(--color-danger)"
                                            }}
                                        >
                                            {" "}
                                            *
                                        </span>
                                    )}
                                </h6>
                                <p>
                                    <b>{question.qtext}</b>
                                    {question.qdesc && (
                                        <>
                                            <br></br>
                                            {question.qdesc}
                                        </>
                                    )}
                                </p>
                                <div style={{ height: "30vh" }}>
                                    <BarGraph
                                        data={this.formatForGraph(
                                            question.responses
                                        )}
                                    />
                                </div>
                                <br></br>
                            </div>
                        ))
                    )}
                </div>
            </PageTransition>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Responses);
