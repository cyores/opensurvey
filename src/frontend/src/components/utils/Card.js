import React from "react";
import styled from "styled-components";
import { checkDates } from "../../utils/index";
import GreenClock from "../../images/clock-green.svg";
import RedClock from "../../images/clock-red.svg";
import { Link } from "react-router-dom";

// components
import Button from "./Button";
import Flex from "./Flex";

const StyledCard = styled.div`
    flex: 1 0 300px;
    height: 300px;
    margin: var(--space-md);
    // box-shadow: 0 16px 32px 0 rgba(55, 58, 75, 0.08);
    box-shadow: 0 16px 32px 0 var(--color-primary-shadow);
    border: 1px solid var(--color-primary-transparent);
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0.05);
    transition: 0.25s ease-in-out;
    backface-visibility: hidden;
    &:hover {
        transform: translate3d(0, -1px, 0) scale(1.02);
    }
`;

export default function Card(props) {
    const { title, desc, buttonText, open, close, surveyID } = props;
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
                        <Flex dir="rowleft">
                            <div style={{ flex: "1 0 auto" }}>
                                <p style={{ fontWeight: 700 }}>{title}</p>
                            </div>
                            <div style={{ flex: "1 0 auto" }}>
                                <p
                                    style={{
                                        fontWeight: 700,
                                        float: "right",
                                        color: dateColor
                                    }}
                                >
                                    <img
                                        src={
                                            dateColor === "green"
                                                ? GreenClock
                                                : RedClock
                                        }
                                        alt="Clock"
                                        style={{
                                            color: dateColor,
                                            width:
                                                "calc(0.8 * var(--text-base-size))",
                                            padding: "0 2px"
                                        }}
                                    />
                                    <small>{dateText}</small>
                                </p>
                            </div>
                        </Flex>

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
                        <Link to={`/survey/${surveyID}`}>
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
