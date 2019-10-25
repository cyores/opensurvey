import React from "react";
import styled from "styled-components";
import Wave from "../images/u-wave2.svg";

// components
import Flex from "./utils/Flex";

const Wrapper = styled.div`
    margin-top: var(--space-xxxxl);
    height: 50vh;
    padding: 0;
    margin: 0;
`;

export default function Footer() {
    return (
        <Wrapper>
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    background: `url(${Wave})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
                {/* <img src={Wave} style={{ width: "100%" }} alt="Footer Wave" /> */}
            </div>
            <div
                style={{
                    background: "var(--color-primary)",
                    color: "#fff",
                    marginTop: "-5%",
                    height: "100%"
                }}
            >
                <Flex>
                    <div style={{ flex: "38" }}>
                        <hr></hr>
                    </div>
                    <div style={{ flex: "24" }}>
                        <h3 style={{ marginTop: 0, textAlign: "center" }}>
                            Open Survey
                        </h3>
                    </div>
                    <div style={{ flex: "38" }}>
                        <hr></hr>
                    </div>
                </Flex>
            </div>
        </Wrapper>
    );
}
