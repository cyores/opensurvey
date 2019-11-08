import React, { Component } from "react";
import { connect } from "react-redux";

// components
import Flex from "../utils/Flex";
import Button from "../utils/Button";
import Input from "../utils/Input";
import Select from "../utils/Select";
import Toggle from "../utils/Toggle";
import Textarea from "../utils/Textarea";

// actions
import { addQuestion, editQuestion } from "../../actions/index";

const questionTypes = ["Text", "Radio", "Checkbox"];

const mapStateToProps = state => {
    return {};
};

function mapDispatchToProps(dispatch) {
    return {
        addQuestion: question => dispatch(addQuestion(question)),
        editQuestion: (question, index) =>
            dispatch(editQuestion(question, index))
    };
}

class Question extends Component {
    constructor(props) {
        super(props);
        if (props.mode === "edit") {
            this.state = {
                question: props.question,
                PAindex: 1
            };
        } else {
            this.state = {
                question: {
                    qtext: "",
                    qdesc: "",
                    qweight: 1,
                    qtype: "Text",
                    required: false,
                    possibleAnswers: []
                },
                PAindex: 1
            };
        }
    }

    handleChange(input, item) {
        let value = input.target.value;
        if (item === "required") {
            value = input.target.checked;
        }
        let q = this.state.question;
        q[item] = value;
        this.setState({ question: q });
    }

    addPossibleAnswer() {
        let q = this.state.question;
        let currIndex = this.state.PAindex;
        q.possibleAnswers = q.possibleAnswers.concat({
            atext: "",
            avalue: null,
            index: currIndex
        });
        this.setState({ question: q, PAindex: currIndex + 1 });
    }

    updatePossibleAnswer(input, index) {
        let q = this.state.question;
        let pas = q.possibleAnswers;
        q.possibleAnswers = pas.map(pa => {
            if (pa.index === index) {
                pa.atext = input.target.value;
                pa.avalue = input.target.value;
            }
            return pa;
        });
        this.setState({ question: q });
    }

    removePossibleAnswer(index) {
        let newPAIndex = this.state.PAindex - 1;
        let q = this.state.question;
        let pas = q.possibleAnswers;
        q.possibleAnswers = pas.reduce((acc, pa) => {
            if (pa.index === index) return acc;
            if (pa.index < index) acc.push(pa);
            else acc.push({ ...pa, index: pa.index - 1 });
            return acc;
        }, []);
        this.setState({ question: q, PAindex: newPAIndex });
    }

    submit() {
        if (this.props.mode === "create") {
            this.props.addQuestion(this.state.question);
        } else if (this.props.mode === "edit") {
            this.props.editQuestion(
                this.state.question,
                this.state.question.index
            );
        }
        this.props.onClose();
    }

    render() {
        const {
            qtext,
            qtype,
            qdesc,
            qweight,
            possibleAnswers,
            required,
            index
        } = this.state.question;
        let isMobile = window.innerWidth < 768;
        return (
            <>
                <Flex dir="rowleft" style={{ height: "100%" }}>
                    <div
                        style={{
                            flex: "66 0 300px"
                        }}
                    >
                        {this.props.mode === "edit" && (
                            <h5 style={{ marginTop: 0 }}>
                                Edit Question {index}
                            </h5>
                        )}
                        {this.props.mode === "create" && (
                            <h5 style={{ marginTop: 0 }}>Create Question</h5>
                        )}

                        <Input
                            type="text"
                            placeholder="Question text"
                            defaultValue={qtext}
                            label="Question"
                            onChange={input =>
                                this.handleChange(input, "qtext")
                            }
                        />
                        <Textarea
                            placeholder="Write your question description here (optional)"
                            label="Description"
                            defaultValue={qdesc}
                            onChange={input =>
                                this.handleChange(input, "qdesc")
                            }
                        />
                        <Flex>
                            <div
                                style={{
                                    flex: "1 0 350px",
                                    paddingRight: "var(--space-xs)",
                                    paddingLeft: "var(--space-xs)"
                                }}
                            >
                                <Select
                                    label="Type"
                                    options={questionTypes}
                                    defaultValue={qtype}
                                    onChange={input =>
                                        this.handleChange(input, "qtype")
                                    }
                                    labelTop={true}
                                />
                            </div>
                            <div
                                style={{
                                    flex: "1 0 350px",
                                    paddingRight: "var(--space-xs)",
                                    paddingLeft: "var(--space-xs)"
                                }}
                            >
                                <Input
                                    type="number"
                                    min={1}
                                    step={1}
                                    placeholder="Weight"
                                    defaultValue={qweight}
                                    label="Weight"
                                    labelTop={true}
                                    onChange={input =>
                                        this.handleChange(input, "qweight")
                                    }
                                />
                            </div>
                            <div
                                style={{
                                    flex: "1 0 100px",
                                    paddingRight: "var(--space-xs)",
                                    paddingLeft: "var(--space-xs)",
                                    marginBottom: "var(--space-md)"
                                }}
                            >
                                <Toggle
                                    defaultChecked={required}
                                    label="Required"
                                    labelStyle={{
                                        marginBottom: "8px",
                                        fontSize: "100%"
                                    }}
                                    onChange={input =>
                                        this.handleChange(input, "required")
                                    }
                                />
                            </div>
                        </Flex>

                        {qtype === "Text" ? (
                            qtext.length > 0 ? (
                                <Flex>
                                    <Button
                                        theme="complement"
                                        onClick={() => this.submit()}
                                    >
                                        {this.props.mode === "edit" && (
                                            <span>Save Edits</span>
                                        )}
                                        {this.props.mode === "create" && (
                                            <span>Add Question</span>
                                        )}
                                    </Button>
                                </Flex>
                            ) : (
                                <>
                                    <Flex>
                                        <Button theme="disabled">
                                            {this.props.mode === "edit" && (
                                                <span>Save Edits</span>
                                            )}
                                            {this.props.mode === "create" && (
                                                <span>Add Question</span>
                                            )}
                                        </Button>
                                    </Flex>
                                    <Flex>
                                        <p
                                            style={{
                                                marginBottom: "var(--space-md)"
                                            }}
                                        >
                                            Your question needs question text.
                                        </p>
                                    </Flex>
                                </>
                            )
                        ) : (
                            <>
                                <Flex>
                                    <h5>Possible Answers</h5>
                                </Flex>
                                <div
                                    key={`pawrapper-${possibleAnswers.length}`}
                                >
                                    {possibleAnswers.map(ans => (
                                        <Flex key={`pa-${ans.index}`}>
                                            <div
                                                style={
                                                    isMobile
                                                        ? { flex: "1 0 100%" }
                                                        : { flex: "1" }
                                                }
                                            >
                                                <Input
                                                    key={`pa-input-${ans.index}`}
                                                    type="text"
                                                    label={`Option ${ans.index}`}
                                                    defaultValue={ans.atext}
                                                    placeholder={`Possible answer ${ans.index} text`}
                                                    onChange={input =>
                                                        this.updatePossibleAnswer(
                                                            input,
                                                            ans.index
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div
                                                style={
                                                    isMobile
                                                        ? { flex: "0" }
                                                        : { flex: "0" }
                                                }
                                            >
                                                <Button
                                                    tabIndex="-1"
                                                    theme="transparent"
                                                    onClick={() =>
                                                        this.removePossibleAnswer(
                                                            ans.index
                                                        )
                                                    }
                                                >
                                                    <span
                                                        style={{
                                                            color:
                                                                "var(--color-danger)"
                                                        }}
                                                    >
                                                        Delete
                                                    </span>
                                                </Button>
                                            </div>
                                        </Flex>
                                    ))}
                                </div>
                                <Flex>
                                    <Button
                                        theme="primary"
                                        style={{
                                            marginBottom: "var(--space-md)"
                                        }}
                                        onClick={() => this.addPossibleAnswer()}
                                    >
                                        Add Possible Answer
                                    </Button>
                                </Flex>
                                {possibleAnswers.length > 0 &&
                                qtext.length > 0 ? (
                                    <>
                                        <br></br>
                                        <Flex>
                                            <Button
                                                theme="complement"
                                                onClick={() => this.submit()}
                                                style={{
                                                    marginBottom:
                                                        "var(--space-md)"
                                                }}
                                            >
                                                {this.props.mode === "edit" && (
                                                    <span>Save Edits</span>
                                                )}
                                                {this.props.mode ===
                                                    "create" && (
                                                    <span>Add Question</span>
                                                )}
                                            </Button>
                                        </Flex>
                                    </>
                                ) : (
                                    <>
                                        <br></br>
                                        <Flex>
                                            <Button
                                                theme="disabled"
                                                style={{
                                                    marginBottom:
                                                        "var(--space-md)"
                                                }}
                                            >
                                                {this.props.mode === "edit" && (
                                                    <span>Save Edits</span>
                                                )}
                                                {this.props.mode ===
                                                    "create" && (
                                                    <span>Add Question</span>
                                                )}
                                            </Button>
                                        </Flex>
                                        <Flex>
                                            <p
                                                style={{
                                                    marginBottom:
                                                        "var(--space-md)"
                                                }}
                                            >
                                                Your question needs question
                                                text and at least one possible
                                                answer.
                                            </p>
                                        </Flex>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                    {/* Question Preview */}
                    <div
                        style={
                            isMobile
                                ? { display: "none" }
                                : {
                                      flex: "33 0 150px",
                                      borderLeft:
                                          "1px solid var(--color-primary)",
                                      paddingLeft: "var(--space-md)",
                                      marginLeft: "var(--space-md)",
                                      height: "100%"
                                  }
                        }
                    >
                        <Flex dir="colcenter" style={{ height: "100%" }}>
                            <Flex
                                dir="col"
                                style={{
                                    flex: "66 0 66px",
                                    width: "100%",
                                    // maxHeight: "66%",
                                    justifyContent: "flex-start"
                                }}
                            >
                                <h5 style={{ margin: 0 }}>Question Preview</h5>
                                <p>
                                    <b>
                                        {qtext}
                                        {required && (
                                            <span
                                                style={{
                                                    color: "var(--color-danger)"
                                                }}
                                            >
                                                {" "}
                                                *
                                            </span>
                                        )}
                                    </b>
                                    <br></br>
                                    {qdesc}
                                </p>

                                {qtype === "Text" && (
                                    <Input
                                        type="text"
                                        label="Answer"
                                        labelTop={true}
                                        placeholder="Type your response here"
                                    />
                                )}

                                {qtype === "Radio" &&
                                    possibleAnswers.map((pa, i) => (
                                        <Input
                                            key={`pa-${i}`}
                                            type="radio"
                                            label={pa.atext}
                                        />
                                    ))}

                                {qtype === "Checkbox" &&
                                    possibleAnswers.map((pa, i) => (
                                        <Input
                                            key={`pa-${i}`}
                                            type="checkbox"
                                            label={pa.atext}
                                        />
                                    ))}
                            </Flex>
                            <Flex
                                dir="colright"
                                style={{
                                    flex: "33 0 33px",
                                    width: "100%",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <div>
                                    <Button
                                        theme="danger"
                                        onClick={() => this.props.onClose()}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
            </>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Question);
