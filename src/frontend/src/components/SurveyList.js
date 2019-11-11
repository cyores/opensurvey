import React from "react";
import { checkDates } from "../utils/index";
import styled from "styled-components";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

// components
import Button from "./utils/Button";

const Wrapper = styled.div`
    flex: 1 0 100%;
    box-shadow: 0 16px 32px 0 var(--color-shadow);
    border-radius: 1rem;
    padding: var(--space-sm);
    background: rgba(0, 0, 0, 0.1);
    transition: 0.25s ease-in-out;
    backface-visibility: hidden;
    margin-bottom: var(--space-md);
    &:hover {
        transform: translate3d(0, -1px, 0) scale(1.02);
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: var(--space-xl);
    justify-items: end;
    align-items: center;
`;

export default function SurveyList(props) {
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
        <Wrapper>
            <Grid>
                <div
                    style={{ justifySelf: "start", padding: "var(--space-sm)" }}
                >
                    <span
                        style={{
                            fontWeight: 700,
                            color: dateColor
                        }}
                    >
                        <FiClock style={{ padding: "0 2px" }} />
                        {dateText}
                    </span>

                    <br></br>

                    <span style={{ fontWeight: 700 }}>{title} </span>

                    <span>({numQuestions} questions)</span>

                    <br></br>

                    {desc ? <span>{desc}</span> : <span>No description.</span>}
                </div>
                <div style={{ padding: "var(--space-sm)" }}>
                    <Link to={isOpen ? `/survey/${surveyID}` : "/"}>
                        <Button
                            theme={isOpen ? "primary" : "disabled"}
                            style={{ margin: 0 }}
                        >
                            {isOpen ? buttonText : "Closed"}
                        </Button>
                    </Link>
                </div>
            </Grid>
        </Wrapper>
    );
}
