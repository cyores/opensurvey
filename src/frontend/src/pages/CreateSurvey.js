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
import { postSurvey } from "../actions/index";

const mapStateToProps = state => {
    return {
        isPosting: state.surveyReducer.isLoading,
        postError: state.surveyReducer.error,
        postSuccess: state.surveyReducer.postSuccess
    };
};

function mapDispatchToProps(dispatch) {
    return {
        postSurvey: survey => dispatch(postSurvey(survey))
    };
}

const modelStyle = {
    content: {
        width: "66vw",
        left: "17vw",
        right: "17vw",
        top: "7vh",
        bottom: "14vh",
        padding: "var(--space-sm)",
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
            survey: {
                name: "",
                desc: "",
                author: "",
                openDate: "",
                endDate: ""
            },
            modalIsOpen: false
        };
    }

    handleChange(input, item) {
        let value = input.target.value;
        if (item === "openDate" || item === "endDate") {
            console.log(value);
            value = new Date(value);
        }
        let survey = {
            ...this.state.survey,
            [item]: value
        };
        this.setState({ survey: survey }, () => console.log(this.state));
    }

    publish() {
        console.log("publishing");
        this.props.postSurvey(this.state.survey);
    }

    render() {
        const { postSuccess, postError } = this.props;
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
                            label="Start Date"
                            onChange={input =>
                                this.handleChange(input, "openDate")
                            }
                        />
                        <Input
                            type="datetime-local"
                            label="End Date"
                            onChange={input =>
                                this.handleChange(input, "endDate")
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
                        <Flex>
                            <Button
                                theme="primary"
                                onClick={() =>
                                    this.setState({ modalIsOpen: true })
                                }
                            >
                                Add Question
                            </Button>
                        </Flex>
                        <ReactModal
                            isOpen={this.state.modalIsOpen}
                            style={modelStyle}
                            closeTimeoutMS={250}
                        >
                            <h1>Hello, World!</h1>
                            <Button
                                theme="danger"
                                onClick={() =>
                                    this.setState({ modalIsOpen: false })
                                }
                            >
                                Close
                            </Button>
                        </ReactModal>
                    </div>
                </Flex>

                <br></br>

                <Flex>
                    <Button theme="primary" onClick={() => this.publish()}>
                        Publish Servey
                    </Button>
                </Flex>

                {postSuccess && <p>Survey was created!</p>}

                {postError && <Error error={postError}></Error>}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateSurvey);
