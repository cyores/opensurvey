import React from "react";
import styled from "styled-components";
import Wave from "../images/wave4.svg";

// components
import { Link } from "react-router-dom";
import Button from "./utils/Button";

const Wrapper = styled.div`
    height: 34vh;
    @media only screen and (max-width: 1024px) {
        margin-bottom: var(--space-xxl);
        text-align: center;
    }
    @media only screen and (max-width: 375px) {
        margin-bottom: var(--space-xxxl);
        text-align: center;
    }
`;

const ContentWrapper = styled.div`
    margin: 0 auto;
    width: 75%;
    @media only screen and (max-width: 1024px) {
        width: 98%;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    @media only screen and (max-width: 1024px) {
        justify-content: space-around;
    }
`;

export default function HomeHero() {
    return (
        <Wrapper>
            <div
                style={{
                    background: `url(${Wave})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: "100%",
                    padding: "var(--space-md) 0",
                    margin: 0,
                    marginTop: "-2vh",
                    paddingTop: "calc(2vh + var(--space-xl))"
                }}
            >
                <ContentWrapper>
                    <h1
                        style={{
                            margin: 0,
                            marginTop: "var(--space-sm)",
                            fontSize: "calc(1.5 * var(--text-xxxxl))"
                        }}
                    >
                        Open Survey
                    </h1>
                    <h5 style={{ margin: 0 }}>
                        An open source tool to create public surveys to share
                        with everyone.
                    </h5>
                    <ButtonWrapper>
                        <Link to="/create-survey">
                            <Button
                                theme="primary"
                                style={{ margin: "var(--space-sm) 0" }}
                            >
                                Create Survey
                            </Button>
                        </Link>
                    </ButtonWrapper>
                </ContentWrapper>
            </div>
        </Wrapper>
    );
}
