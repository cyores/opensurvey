import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Flex from "../components/utils/Flex";
import Input from "../components/utils/Input";
import Textarea from "../components/utils/Textarea";
import Button from "../components/utils/Button";
import Error from "../components/utils/Error";

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
            }
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
                            <Button theme="primary">Add Question</Button>
                        </Flex>
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
