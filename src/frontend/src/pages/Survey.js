import React, { Component } from "react";
import { connect } from "react-redux";
import { checkDates } from "../utils/index";
import GreenClock from "../images/clock-green.svg";
import RedClock from "../images/clock-red.svg";

// actions
import { fetchSurvey } from "../actions/index";
import Flex from "../components/utils/Flex";
import Error from "../components/utils/Error";
import Input from "../components/utils/Input";

const mapStateToProps = state => {
    return {
        survey: state.fetchOneSurveyReducer.survey,
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
        const { survey, isLoading, fetchError } = this.props;
        const { dateText, dateColor } = checkDates(
            survey.open_date,
            survey.close_date
        );
        const questions = survey.questions || [];

        if (isLoading) {
            return <p>Loading . . . </p>;
        }

        if (fetchError) {
            return (
                <Flex>
                    <Error error={fetchError} />
                </Flex>
            );
        }

        return (
            <div className="container">
                <Flex>
                    <div style={{ flex: "66 0 300px" }}>
                        <h2>{survey.name}</h2>
                    </div>
                    <div style={{ flex: "33 0 150px" }}>
                        <p
                            style={{
                                fontWeight: 700,
                                float: "right",
                                color: dateColor
                            }}
                        >
                            <img
                                src={
                                    dateColor === "green"
                                        ? GreenClock
                                        : RedClock
                                }
                                alt="Clock"
                                style={{
                                    color: dateColor,
                                    width: "calc(0.8 * var(--text-base-size))",
                                    padding: "0 2px"
                                }}
                            />
                            <small>{dateText}</small>
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

                {questions.map((question, qindex) => (
                    <div
                        key={`question-${qindex}`}
                        style={{ margin: "var(--space-xxl) 0" }}
                    >
                        <h6 style={{ margin: 0 }}>
                            Question {qindex + 1}{" "}
                            {question.required && (
                                <span style={{ color: "#d30930" }}> *</span>
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

                        {question.qtype === "text" && (
                            <div key={`pa-${qindex}`} style={{ maxWidth: "800px" }}>
                                <Input
                                    type={question.qtype}
                                    labelTop={true}
                                    placeholder="Type your response here"
                                />
                            </div>
                        )}

                        {question.possibleAnswers.map((pa, paindex) => (
                            <div
                                key={`pa-${qindex}-${paindex}`}
                                style={{ padding: "0 var(--space-md)" }}
                            >
                                <Input
                                    type={question.qtype}
                                    label={pa.atext}
                                    name={"question.id"}
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Survey);
