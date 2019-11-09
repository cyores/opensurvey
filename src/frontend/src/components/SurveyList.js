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
    // border: 1px solid var(--color-shadow);
    border-radius: 1rem;
    padding: var(--space-sm);
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
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
                <div style={{ flex: "1 0 auto" }}>
                    <p>
                        <span style={{ fontWeight: 700 }}>{title} </span>

                        <small>({numQuestions} questions)</small>
                        <br></br>
                        {desc ? (
                            <span>{desc}</span>
                        ) : (
                            <span>No description.</span>
                        )}
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
            <Link to={isOpen ? `/survey/${surveyID}` : null}>
                <Button
                    theme={isOpen ? "primary" : "disabled"}
                    style={{ margin: 0 }}
                >
                    {isOpen ? buttonText : "Closed"}
                </Button>
            </Link>
        </Wrapper>
    );
}
