import React, { Component } from "react";

// components
import Flex from "../utils/Flex";
import Button from "../utils/Button";
import Input from "../utils/Input";
import Select from "../utils/Select";
import Toggle from "../utils/Toggle";
import Textarea from "../utils/Textarea";

const questionTypes = ["Text", "Radio", "Checkbox"];

class CreateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            qtext: "",
            qdesc: "",
            qweight: 1,
            qtype: "Text",
            required: false,
            possibleAnswers: [],
            PAindex: 1
        };
    }

    handleChange(input, item) {
        let value = input.target.value;
        if (item === "required") {
            value = input.target.checked;
        }
        this.setState({ [item]: value }, () => console.log(this.state));
    }

    addPossibleAnswer() {
        let pas = this.state.possibleAnswers;
        let currIndex = this.state.PAindex;
        pas = pas.concat({ atext: "", index: currIndex });
        this.setState({ possibleAnswers: pas, PAindex: currIndex + 1 });
    }

    render() {
        const { qtype, possibleAnswers } = this.state;
        return (
            <>
                <h4 style={{ marginTop: 0 }}>New Question</h4>
                <Input
                    type="text"
                    placeholder="Question text"
                    label="Question"
                    onChange={input => this.handleChange(input, "qtext")}
                />
                <Textarea
                    placeholder="Write your question description here (optional)"
                    label="Description"
                    onChange={input => this.handleChange(input, "qdesc")}
                />
                <Flex>
                    <div
                        style={{ flex: "45", paddingRight: "var(--space-md)" }}
                    >
                        <Select
                            label="Type"
                            options={questionTypes}
                            defaultValue="Text"
                            onChange={input =>
                                this.handleChange(input, "qtype")
                            }
                            labelTop={true}
                        />
                    </div>
                    <div
                        style={{ flex: "45", paddingRight: "var(--space-md)" }}
                    >
                        <Input
                            type="number"
                            min={1}
                            step={1}
                            placeholder="Weight"
                            defaultValue="1"
                            label="Weight"
                            labelTop={true}
                            onChange={input =>
                                this.handleChange(input, "qweight")
                            }
                        />
                    </div>
                    <div style={{ flex: "10" }}>
                        <Toggle
                            defaultChecked={false}
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
                    <Flex>
                        <Button theme="complement">Add Question</Button>
                    </Flex>
                ) : (
                    <>
                        <Flex>
                            <h5>Possible Answers</h5>
                        </Flex>
                        <div style={{ margin: "0 auto", width: "75%" }}>
                            {possibleAnswers.map(ans => (
                                <Input
                                    key={`pa-${ans.index}`}
                                    type="text"
                                    label={`Option ${ans.index}`}
                                    placeholder={`Possible answer ${ans.index} text`}
                                />
                            ))}
                        </div>
                        <Flex>
                            <Button
                                theme="primary"
                                onClick={() => this.addPossibleAnswer()}
                            >
                                Add Possible Answer
                            </Button>
                        </Flex>
                        {possibleAnswers.length > 0 && (
                            <>
                                <br></br>
                                <Flex>
                                    <Button theme="complement">
                                        Add Question
                                    </Button>
                                </Flex>
                            </>
                        )}
                    </>
                )}

                <br></br>
                <br></br>

                <Flex dir="rowright">
                    <Button theme="danger" onClick={() => this.props.onClose()}>
                        Cancel
                    </Button>
                </Flex>
            </>
        );
    }
}

export default CreateQuestion;
