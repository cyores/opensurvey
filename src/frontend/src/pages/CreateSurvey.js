import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Flex from "../components/utils/Flex";
import Input from "../components/utils/Input";
import Textarea from "../components/utils/Textarea";
import Button from "../components/utils/Button";
import Error from "../components/utils/Error";
import ReactModal from "react-modal";

// actions
import { postSurvey, updateSurvey, refreshSurvey } from "../actions/index";
import CreateQuestion from "../components/modals/CreateQuestion.modal";
import QuestionCS from "../components/QuestionCS";

const mapStateToProps = state => {
    return {
        survey: state.createSurveyReducer.survey,
        isPosting: state.createSurveyReducer.isPosting,
        postSuccess: state.createSurveyReducer.postSuccess,
        postError: state.createSurveyReducer.postError
    };
};

function mapDispatchToProps(dispatch) {
    return {
        postSurvey: survey => dispatch(postSurvey(survey)),
        updateSurvey: survey => dispatch(updateSurvey(survey)),
        refreshSurvey: () => dispatch(refreshSurvey())
    };
}

const modelStyle = {
    content: {
        left: "15vw",
        right: "15vw",
        top: "10vh",
        bottom: "12vh",
        padding: "var(--space-xl)",
        borderRadius: "1rem",
        borderColor: "var(--color-primary)",
        backgroundColor: "var(--color-bg)",
        boxShadow: "0 2px 32px var(--color-primary)"
    },
    overlay: {
        backgroundColor: "transparent",
        backdropFilter: "blur(4px)"
    }
};

ReactModal.setAppElement("#root");

class CreateSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.props.refreshSurvey();
    }

    handleChange(input, item) {
        let value = input.target.value;
        if (item === "openDate" || item === "closeDate") {
            value = new Date(value);
        }
        let survey = {
            ...this.props.survey,
            [item]: value
        };
        this.props.updateSurvey(survey);
    }

    deleteQuestion(q) {
        let questions = this.props.survey.questions;
        questions = questions.filter(question => {
            if (question === q) {
                return false;
            }
            return true;
        });
        let survey = {
            ...this.props.survey,
            questions: questions
        };
        this.props.updateSurvey(survey);
    }

    publish() {
        this.props.postSurvey(this.props.survey);
    }

    render() {
        const { postSuccess, postError, isPosting, survey } = this.props;
        if (postSuccess) {
            return (
                <div className="container">
                    <h2>Create New Survey</h2>
                    <hr></hr>
                    <Flex>
                        <h4>Survey created!</h4>
                    </Flex>
                </div>
            );
        }
        return (
            <div className="container">
                <h2>Create New Survey</h2>

                <hr></hr>

                <Flex dir="rowleft">
                    <div
                        style={{
                            flex: "1 0 100px",
                            margin: "var(--space-sm) 0"
                        }}
                    >
                        <h4 style={{ margin: 0 }}>Survey Details</h4>
                    </div>
                    <div
                        style={{
                            flex: "3 0 300px",
                            margin: "var(--space-sm) 0"
                        }}
                    >
                        <Input
                            type="text"
                            placeholder="Survey Name"
                            label="Survey Name"
                            onChange={input => this.handleChange(input, "name")}
                        />
                        <Textarea
                            placeholder="Write your survey description here"
                            label="Description"
                            onChange={input => this.handleChange(input, "desc")}
                        />
                        <Input
                            type="text"
                            placeholder="Survey Author (optional)"
                            label="Survey Author (optional)"
                            onChange={input =>
                                this.handleChange(input, "author")
                            }
                        />
                        <Input
                            type="datetime-local"
                            label="Open Date"
                            onChange={input =>
                                this.handleChange(input, "openDate")
                            }
                        />
                        <Input
                            type="datetime-local"
                            label="Close Date"
                            onChange={input =>
                                this.handleChange(input, "closeDate")
                            }
                        />
                    </div>
                </Flex>

                <br></br>

                <Flex dir="rowleft">
                    <div
                        style={{
                            flex: "1 0 100px",
                            margin: "var(--space-sm) 0"
                        }}
                    >
                        <h4 style={{ margin: 0 }}>Survey Questions</h4>
                    </div>
                    <div
                        style={{
                            flex: "3 0 300px",
                            margin: "var(--space-sm) 0"
                        }}
                    >
                        {survey.questions.length > 0 && (
                            <>
                                {survey.questions.map((question, i) => (
                                    <QuestionCS
                                        key={`question-${i}`}
                                        qtext={question.qtext}
                                        qtype={question.qtype}
                                        qindex={i + 1}
                                        onDelete={() =>
                                            this.deleteQuestion(question)
                                        }
                                    />
                                ))}
                                <br></br>
                            </>
                        )}
                        <Flex>
                            <Button
                                theme="primary"
                                onClick={() =>
                                    this.setState({ modalIsOpen: true })
                                }
                            >
                                Create Question
                            </Button>
                        </Flex>
                        <ReactModal
                            isOpen={this.state.modalIsOpen}
                            style={modelStyle}
                            closeTimeoutMS={250}
                            onRequestClose={() =>
                                this.setState({ modalIsOpen: false })
                            }
                        >
                            <CreateQuestion
                                onClose={() =>
                                    this.setState({ modalIsOpen: false })
                                }
                            />
                        </ReactModal>
                    </div>
                </Flex>

                <br></br>

                {survey.name.length > 0 && survey.questions.length > 0 && (
                    <Flex>
                        <Button
                            theme="complement"
                            onClick={() => this.publish()}
                        >
                            Publish Servey
                        </Button>
                    </Flex>
                )}

                {isPosting && <p>Creating survey . . . </p>}

                {postError && <Error error={postError}></Error>}

                <br></br>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSurvey);
