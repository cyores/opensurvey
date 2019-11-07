import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Flex from "../components/utils/Flex";
import Input from "../components/utils/Input";
import Textarea from "../components/utils/Textarea";
import Button from "../components/utils/Button";
import Error from "../components/utils/Error";
import PageTransition from "../components/utils/PageTransition";
import QuestionCS from "../components/QuestionCS";
import Question from "../components/modals/Question.modal";
import ModalWrapper from "../components/utils/ModalWrapper";

// actions
import {
    postSurvey,
    updateSurvey,
    refreshSurvey,
    delQuestion
} from "../actions/index";

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
        delQuestion: index => dispatch(delQuestion(index)),
        refreshSurvey: () => dispatch(refreshSurvey())
    };
}

class CreateSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            addModal: false,
            editModal: false,
            editQuestion: {}
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

    publish() {
        this.props.postSurvey(this.props.survey);
    }

    render() {
        const { postSuccess, postError, isPosting, survey } = this.props;
        const sortedQuestions = survey.questions.sort((a, b) =>
            a.index > b.index ? 1 : -1
        );

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
            <PageTransition>
                <div className="container">
                    <h2>Create New Survey</h2>

                    <hr></hr>

                    <Flex dir="rowleft">
                        <div
                            style={{
                                flex: "33 0 150px",
                                margin: "var(--space-sm) 0"
                            }}
                        >
                            <h5 style={{ margin: 0 }}>Survey Details</h5>
                        </div>
                        <div
                            style={{
                                flex: "66 0 300px",
                                margin: "var(--space-sm) 0"
                            }}
                        >
                            <Input
                                type="text"
                                placeholder="Survey Name"
                                label="Survey Name"
                                onChange={input =>
                                    this.handleChange(input, "name")
                                }
                            />
                            <Textarea
                                placeholder="Write your survey description here"
                                label="Description"
                                onChange={input =>
                                    this.handleChange(input, "desc")
                                }
                            />
                            <Input
                                type="text"
                                placeholder="Survey Author (optional)"
                                label="Survey Author (optional)"
                                onChange={input =>
                                    this.handleChange(input, "author")
                                }
                            />
                            <Flex dir="rowleft">
                                <div
                                    style={{
                                        flex: "1 0 300px",
                                        paddingLeft: "var(--space-xs)",
                                        paddingRight: "var(--space-xs)"
                                    }}
                                >
                                    <Input
                                        type="datetime-local"
                                        label="Open Date"
                                        labelTop={true}
                                        onChange={input =>
                                            this.handleChange(input, "openDate")
                                        }
                                    />
                                </div>
                                <div
                                    style={{
                                        flex: "1 0 300px",
                                        paddingLeft: "var(--space-xs)"
                                    }}
                                >
                                    <Input
                                        type="datetime-local"
                                        label="Close Date"
                                        labelTop={true}
                                        onChange={input =>
                                            this.handleChange(
                                                input,
                                                "closeDate"
                                            )
                                        }
                                    />
                                </div>
                            </Flex>
                        </div>
                    </Flex>

                    <br></br>

                    <Flex dir="rowleft">
                        <div
                            style={{
                                flex: "33 0 150px",
                                margin: "var(--space-sm) 0"
                            }}
                        >
                            <h5 style={{ margin: 0 }}>Survey Questions</h5>
                        </div>
                        <div
                            style={{
                                flex: "66 0 300px",
                                margin: "var(--space-sm) 0"
                            }}
                        >
                            {survey.questions.length > 0 && (
                                <>
                                    {sortedQuestions.map((question, i) => (
                                        <QuestionCS
                                            key={`question-${i}`}
                                            question={question}
                                            numQuestions={
                                                survey.questions.length
                                            }
                                            onDelete={() =>
                                                this.props.delQuestion(
                                                    question.index
                                                )
                                            }
                                            onEdit={() =>
                                                this.setState({
                                                    modalIsOpen: true,
                                                    editModal: true,
                                                    addModal: false,
                                                    editQuestion: question
                                                })
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
                                        this.setState({
                                            modalIsOpen: true,
                                            addModal: true,
                                            editModal: false
                                        })
                                    }
                                >
                                    Create Question
                                </Button>
                            </Flex>

                            <ModalWrapper modalIsOpen={this.state.modalIsOpen}>
                                {this.state.addModal && (
                                    <Question
                                        mode="create"
                                        onClose={() =>
                                            this.setState({
                                                modalIsOpen: false
                                            })
                                        }
                                    />
                                )}
                                {this.state.editModal && (
                                    <Question
                                        mode="edit"
                                        question={this.state.editQuestion}
                                        onClose={() =>
                                            this.setState({
                                                modalIsOpen: false
                                            })
                                        }
                                    ></Question>
                                )}
                            </ModalWrapper>
                        </div>
                    </Flex>

                    <br></br>

                    <Flex dir="rowleft">
                        <div
                            style={{
                                flex: "33 0 150px",
                                margin: "var(--space-sm) 0"
                            }}
                        >
                            <h5 style={{ margin: 0 }}>Publish Survey</h5>
                        </div>
                        <div
                            style={{
                                flex: "66 0 300px",
                                margin: "var(--space-sm) 0"
                            }}
                        >
                            {survey.name.length > 0 &&
                            survey.questions.length > 0 ? (
                                <Flex>
                                    <Button
                                        theme="complement"
                                        onClick={() => this.publish()}
                                    >
                                        Publish Servey
                                    </Button>
                                </Flex>
                            ) : (
                                <>
                                    <Flex>
                                        <Button theme="disabled">
                                            Publish Servey
                                        </Button>
                                    </Flex>
                                    <Flex>
                                        <p>
                                            Your survey needs a name and at
                                            least one question.
                                        </p>
                                    </Flex>
                                </>
                            )}
                        </div>
                    </Flex>

                    {isPosting && <p>Creating survey . . . </p>}

                    {postError && <Error error={postError}></Error>}

                    <br></br>
                </div>
            </PageTransition>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSurvey);
