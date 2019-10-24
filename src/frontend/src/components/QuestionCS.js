import React from "react";

// components
import Flex from "./utils/Flex";
import Button from "./utils/Button";

export default function QuestionCS(props) {
    return (
        <Flex>
            <div style={{ flex: 4 }}>
                <Flex dir="rowleft">
                    <p>{props.qindex}. {props.qtext} (type: {props.qtype})</p>
                </Flex>
            </div>
            <div style={{ flex: 1 }}>
                <Flex dir="rowright">
                    <Button theme="danger" onClick={() => props.onDelete()}>Delete</Button>
                </Flex>
            </div>
        </Flex>
    );
}
