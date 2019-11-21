import React, { Component } from "react";
import { connect } from "react-redux";
import { checkDates } from "../utils/index";
import { FiClock } from "react-icons/fi";

// actions
import { fetchSurvey, postResponse, refreshResponse } from "../actions/index";

// components
import Flex from "../components/utils/Flex";
import Error from "../components/utils/Error";
import Input from "../components/utils/Input";
import Button from "../components/utils/Button";
import PageTransition from "../components/utils/PageTransition";
import Spinner from "../components/utils/Spinner";
import { Link } from "react-router-dom";

const mapStateToProps = state => {
    return {
        survey: state.fetchOneSurveyReducer.survey,
        requiredQuestions: state.fetchOneSurveyReducer.requiredQuestions,
        isLoading: state.fetchOneSurveyReducer.isLoading,
        fetchError: state.fetchOneSurveyReducer.fetchError,
        isPosting: state.postResponseReducer.isPosting,
        postSuccess: state.postResponseReducer.postSuccess,
        postError: state.postResponseReducer.postError
    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSurvey: id => dispatch(fetchSurvey(id)),
        postResponse: response => dispatch(postResponse(response)),
        refreshResponse: () => dispatch(refreshResponse())
    };
}

class Survey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responses: {},
            answeredIDs: []
        };
        this.props.refreshResponse();
    }

    componentDidMount() {
        this.props.fetchSurvey(this.props.match.params.id);
    }

    handleChange(input, qid, type) {
        let responses = this.state.responses;
        let answeredIDs = this.state.answeredIDs;
        let value = input.target.value;
        let response = {};
        let index = answeredIDs.findIndex(ele => {
            return qid === ele;
        });

        if (type === "checkbox") {
            if (input.target.checked) {
                // a checkbox option has been checked
                response = {
                    surveyID: this.props.survey.id,
                    questionID: qid,
                    text: value
                };
                responses[qid.toString() + value.toString()] = response;
                answeredIDs.push(qid);
            } else {
                // a checkbox option has been unchecked
                delete responses[qid.toString() + value.toString()];
                if (index > -1) {
                    answeredIDs.splice(index, 1);
                }
            }
        } else {
            if (value === "") {
                // if a textbox is left empty
                delete responses[qid];
                if (index > -1) {
                    answeredIDs.splice(index, 1);
                }
            } else {
                response = {
                    surveyID: this.props.survey.id,
                    questionID: qid,
                    text: value
                };
                responses[qid] = response;
                if (index === -1) {
                    // not answered yet, else already asnwered this question
                    answeredIDs.push(qid);
                }
            }
        }

        this.setState({ responses: responses, answeredIDs: answeredIDs });
    }

    submit() {
        let allAnswered = this.checkIfAllAnswered();
        if (allAnswered) {
            this.props.postResponse(Object.values(this.state.responses));
        }
    }

    checkIfAllAnswered() {
        let rqs = this.props.requiredQuestions;
        let aqs = this.state.answeredIDs;
        let unanswered = rqs.filter(id => {
            if (aqs.includes(id)) return false;
            return true;
        });
        if (unanswered.length === 0) return true;
        return false;
    }

    render() {
        const {
            survey,
            isLoading,
            fetchError,
            isPosting,
            postSuccess,
            postError
        } = this.props;
        const { dateText, dateColor } = checkDates(
            survey.open_date,
            survey.close_date
        );
        const questions = survey.questions || [];

        if (isLoading) {
            return (
                <div className="container">
                    <div
                        style={{
                            display: "flex",
                            flexFlow: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh"
                        }}
                    >
                        <Spinner />
                    </div>
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

        if (postError) {
            return (
                <div className="container">
                    <Flex>
                        <Error error={postError} />
                    </Flex>
                </div>
            );
        }

        if (postSuccess) {
            window.scrollTo({ top: 0, behavior: "smooth" });
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
                                <FiClock style={{ padding: "0 2px" }} />
                                {dateText}
                            </p>
                        </div>
                    </Flex>
                    <hr></hr>
                    <h6>Survey submitted!</h6>
                    <Link to={`/responses/${survey.id}`}>
                        <Button
                            theme="primary"
                            style={{ margin: "var(--space-sm) 0" }}
                        >
                            View Responses
                        </Button>
                    </Link>
                </div>
            );
        }

        return (
            <PageTransition>
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

                    {questions.map((question, qindex) => (
                        <div
                            key={`question-${qindex}`}
                            style={{ margin: "var(--space-xxl) 0" }}
                        >
                            <h6 style={{ margin: 0 }}>
                                Question {qindex + 1}{" "}
                                {question.required && (
                                    <span
                                        style={{ color: "var(--color-danger)" }}
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

                            {question.qtype === "text" && (
                                <div
                                    key={`pa-${qindex}`}
                                    style={{ maxWidth: "800px" }}
                                >
                                    <Input
                                        type={question.qtype}
                                        labelTop={true}
                                        placeholder="Type your response here"
                                        onChange={input =>
                                            this.handleChange(
                                                input,
                                                question.id,
                                                question.qtype
                                            )
                                        }
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
                                        value={pa.avalue}
                                        label={pa.atext}
                                        name={question.id}
                                        onChange={input =>
                                            this.handleChange(
                                                input,
                                                question.id,
                                                question.qtype
                                            )
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    {this.checkIfAllAnswered() ? (
                        <>
                            <Button
                                theme="complement"
                                onClick={() => this.submit()}
                            >
                                Submit
                            </Button>
                            <small style={{ marginLeft: "var(--space-xs)" }}>
                                <em></em>
                            </small>
                        </>
                    ) : (
                        <>
                            <Button theme="disabled">Submit</Button>
                            <small style={{ marginLeft: "var(--space-xs)" }}>
                                <em>Please answer all required questions</em>
                            </small>
                        </>
                    )}
                    {isPosting && (
                        <>
                            <br></br>
                            <p>Submitting . . . </p>
                        </>
                    )}
                </div>
            </PageTransition>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
