import React from "react";
import styled from "styled-components";
import { checkDates } from "../../utils/index";
import { Link } from "react-router-dom";
import { FiClock } from "react-icons/fi";

// components
import Button from "./Button";
import Flex from "./Flex";

const StyledCard = styled.div`
    flex: 1 0 300px;
    height: 300px;
    margin: var(--space-md);
    box-shadow: 0 16px 32px 0 var(--color-shadow);
    // border: 1px solid var(--color-shadow);
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.1);
    transition: 0.25s ease-in-out;
    backface-visibility: hidden;
    &:hover {
        transform: translate3d(0, -1px, 0) scale(1.02);
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
`;

export default function Card(props) {
    const {
        title,
        desc,
        buttonText,
        open,
        close,
        surveyID,
        numQuestions
    } = props;
    const { isOpen, dateText, dateColor } = checkDates(open, close);

    return (
        <StyledCard>
            <Flex dir="colcenter" style={{ height: "100%" }}>
                <Flex
                    dir="col"
                    style={{
                        flex: "66 0 66px",
                        width: "100%",
                        maxHeight: "66%",
                        justifyContent: "flex-start",
                        overflow: "hidden"
                    }}
                >
                    <div
                        style={{
                            padding: "var(--space-sm)"
                        }}
                    >
                        <Grid>
                            <div style={{ flex: "1 0 auto" }}>
                                <p>
                                    <span style={{ fontWeight: 700 }}>
                                        {title}
                                    </span>
                                    <br></br>
                                    <small>{numQuestions} questions</small>
                                </p>
                            </div>
                            <div style={{ flex: "1 0 auto" }}>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        float: "right",
                                        color: dateColor
                                    }}
                                >
                                    <FiClock style={{ padding: "0 2px" }} />
                                    {dateText}
                                </p>
                            </div>
                        </Grid>

                        {desc ? <p>{desc}</p> : <p>No description.</p>}
                    </div>
                </Flex>

                <Flex
                    dir="col"
                    style={{
                        flex: "33 0 33px",
                        width: "100%",
                        justifyContent: "flex-end"
                    }}
                >
                    <div
                        style={{
                            padding: "var(--space-sm)"
                        }}
                    >
                        <Link to={isOpen ? `/survey/${surveyID}` : null}>
                            <Button
                                theme={isOpen ? "full" : "full-disabled"}
                                style={{ margin: 0 }}
                            >
                                {isOpen ? buttonText : "Closed"}
                            </Button>
                        </Link>
                    </div>
                </Flex>
            </Flex>
        </StyledCard>
    );
}
