import React from "react";
import styled from "styled-components";

// components
import Flex from "./utils/Flex";
import Button from "./utils/Button";

const Grid = styled.div`
    display: grid;
    grid-template-columns: 20fr auto auto;
    grid-column-gap: var(--space-xxs);
    border-radius: 1rem;
    padding: var(--space-xxs);
    margin-bottom: var(--space-sm);
    &:hover {
        box-shadow: 0 16px 32px 0 var(--color-primary-shadow);
    }
    & > div {
        padding: 0 var(--space-sm);
    }
`;

const QType = styled.span`
    // font-family: serif;
    letter-spacing: 1px;
    border: 1px solid var(--color-text);
    border-radius: 4px;
    padding: 0 4px;
`;

export default function QuestionCS(props) {
    const { qtext, qtype, qindex } = props;
    return (
        <Grid>
            <div style={{ justifySelf: "start", alignSelf: "center" }}>
                <p>
                    <b>Question {qindex}</b>
                    <br></br>
                    {qtext}
                    <br></br>
                    <QType>
                        <small>{qtype.toLowerCase()}</small>
                    </QType>
                </p>
            </div>
            <div style={{ justifySelf: "end", alignSelf: "center" }}>
                <Button theme="transparent">Edit</Button>
            </div>
            <div style={{ justifySelf: "end", alignSelf: "center" }}>
                <Button theme="danger" onClick={() => props.onDelete()}>
                    Delete
                </Button>
            </div>
        </Grid>
    );
}
