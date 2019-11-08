import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

// actions
import { editQuestion } from "../actions/index";

// components
import Button from "./utils/Button";
import Flex from "./utils/Flex";
import PageTransition from "./utils/PageTransition";

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto 60fr auto auto;
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

const Arrow = styled.span`
    cursor: pointer;
    opacity: ${props => props.opacity}
    transition: all 0.25s ease-in-out;
    &:hover {
        opacity: ${props => props.hoverOpacity};
    }
`;

function mapDispatchToProps(dispatch) {
    return {
        editQuestion: (question, index) =>
            dispatch(editQuestion(question, index))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(props => {
    const { qtext, qtype, index } = props.question;
    const { numQuestions } = props;
    return (
        <PageTransition>
            <Grid>
                <div style={{ justifySelf: "start", alignSelf: "center" }}>
                    <Flex dir="colcenter">
                        <Arrow
                            opacity={index === 1 ? 0.25 : 0.75}
                            hoverOpacity={index === 1 ? 0.25 : 1}
                            onClick={
                                index <= 1
                                    ? null
                                    : () =>
                                          props.editQuestion(
                                              {
                                                  ...props.question,
                                                  index: index - 1
                                              },
                                              index
                                          )
                            }
                        >
                            &#x25B2;
                        </Arrow>
                        <b>{index} </b>
                        <Arrow
                            opacity={index === numQuestions ? 0.25 : 0.75}
                            hoverOpacity={index === numQuestions ? 0.25 : 1}
                            onClick={
                                index === numQuestions
                                    ? null
                                    : () =>
                                          props.editQuestion(
                                              {
                                                  ...props.question,
                                                  index: index + 1
                                              },
                                              index
                                          )
                            }
                        >
                            &#x25BC;
                        </Arrow>
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
        </PageTransition>
    );
});
