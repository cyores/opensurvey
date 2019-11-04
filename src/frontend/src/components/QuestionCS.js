import React from "react";
import styled from "styled-components";

// components
import Button from "./utils/Button";
import Flex from "./utils/Flex";

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto 20fr auto auto;
    grid-column-gap: var(--space-xxs);
    border-radius: 1rem;
    padding: var(--space-xxs);
    margin-bottom: var(--space-sm);
    transition: 0.25s ease-in-out;
    &:hover {
        box-shadow: 0 16px 32px 0 var(--color-primary-shadow);
    }
    & > div {
        padding: 0 var(--space-sm);
    }
`;

const QType = styled.span`
    // font-family: serif;
    margin-left: 4px;
    letter-spacing: 1px;
    border: 1px solid var(--color-text);
    border-radius: 4px;
    padding: 0 4px;
`;

export default function QuestionCS(props) {
    const { qtext, qtype, index } = props;
    return (
        <Grid>
            <div style={{ justifySelf: "start", alignSelf: "center" }}>
                <Flex dir="colcenter">
                    <span>&#x25B2;</span>
                    <b>{index} </b>
                    <span>&#x25BC;</span>
                </Flex>
            </div>
            <div style={{ justifySelf: "start", alignSelf: "center" }}>
                <p>
                    <b>Question {index} </b>
                    <QType>
                        <small>{qtype.toLowerCase()}</small>
                    </QType>
                    <br></br>
                    {qtext}
                    <br></br>
                </p>
            </div>
            <div style={{ justifySelf: "end", alignSelf: "center" }}>
                <Button theme="transparent" onClick={() => props.onEdit()}>
                    Edit
                </Button>
            </div>
            <div style={{ justifySelf: "end", alignSelf: "center" }}>
                <Button theme="danger" onClick={() => props.onDelete()}>
                    Delete
                </Button>
            </div>
        </Grid>
    );
}
