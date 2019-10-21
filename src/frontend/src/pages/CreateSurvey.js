import React, { Component } from "react";

// components
import Flex from "../components/utils/Flex";
import Input from "../components/utils/Input";
import Textarea from "../components/utils/Textarea";
import Button from "../components/utils/Button";

class CreateSurvey extends Component {
    render() {
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
                        />
                        <Textarea
                            placeholder="Write your survey description here"
                            label="Description"
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
            </div>
        );
    }
}

export default CreateSurvey;
