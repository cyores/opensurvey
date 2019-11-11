import React from "react";
import styled from "styled-components";

const Spinning = styled.div`
    margin: 0 auto;
    border: 2px solid var(--color-primary);
    width: var(--text-xxxxl);
    height: var(--text-xxxxl);
    @keyframes spin {
        0% {
            border-top-left-radius: 100vw;
            border-top-right-radius: 25vw;
            border-bottom-right-radius: 25vw;
            border-bottom-left-radius: 25vw;
        }
        25% {
            border-top-left-radius: 25vw;
            border-top-right-radius: 100vw;
            border-bottom-right-radius: 25vw;
            border-bottom-left-radius: 25vw;
        }
        50% {
            border-top-left-radius: 25vw;
            border-top-right-radius: 25vw;
            border-bottom-right-radius: 100vw;
            border-bottom-left-radius: 25vw;
        }
        75% {
            border-top-left-radius: 25vw;
            border-top-right-radius: 25vw;
            border-bottom-right-radius: 25vw;
            border-bottom-left-radius: 100vw;
        }
        100% {
            border-top-left-radius: 100vw;
            border-top-right-radius: 25vw;
            border-bottom-right-radius: 25vw;
            border-bottom-left-radius: 25vw;
        }
    }

    animation-name: spin;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
`;

export default function Spinner() {
    return (
        <div style={{ margin: "0 auto", textAlign: "center" }}>
            <Spinning />
            <small>loading</small>
        </div>
    );
}
