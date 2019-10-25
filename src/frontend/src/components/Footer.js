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
                    marginTop: "-7%",
                    paddingBottom: "var(--space-xxxxl)"
                    // height: "100%"
                }}
            >
                <div className="container" style={{ minHeight: "unset" }}>
                    <Flex>
                        <div style={{ flex: "38" }}>
                            <hr style={{ borderColor: "#fff" }}></hr>
                        </div>
                        <div style={{ flex: "24", textAlign: "center" }}>
                            <h3 style={{marginTop: "var(--space-xxs)"}}>Open Survey</h3>
                        </div>

                        <div style={{ flex: "38" }}>
                            <hr style={{ borderColor: "#fff" }}></hr>
                        </div>
                    </Flex>
                    <Flex>
                        <div
                            style={{
                                flex: "1 0 300px",
                                textAlign: "center"
                            }}
                        >
                            <h5>About</h5>
                            <p>
                                Allows people to create surveys/polls for others
                                to answer. Completely anonymous, no account
                                required for anyone (even survey creators).
                            </p>
                        </div>
                        <div
                            style={{
                                flex: "1 0 300px",
                                textAlign: "center"
                            }}
                        >
                            <h5>Github</h5>
                            <p>
                                This project is open source. Checkout the GitHub
                                repository{" "}
                                <a
                                    style={{ color: "skyblue" }}
                                    href="https://github.com/cyores/opensurvey"
                                >
                                    here
                                </a>
                            </p>
                        </div>
                        <div
                            style={{
                                flex: "1 0 300px",
                                textAlign: "center"
                            }}
                        >
                            <h5>How it works</h5>
                            <p>Coming soon . . .</p>
                        </div>
                    </Flex>
                    <br></br>
                    <br></br>
                    <Flex>
                        <small>
                            made by{" "}
                            <a
                                style={{ color: "skyblue" }}
                                href="https://cyores.github.io/"
                            >
                                christian yores
                            </a>
                        </small>
                    </Flex>
                </div>
            </div>
        </Wrapper>
    );
}
