import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 100%;
    padding: var(--space-sm);
    border-radius: 1rem;
    background: #d30930;
    color: var(--color-text-light);
    margin: var(--space-sm) 0;
    box-shadow: 0 2px 4px #d30930;
    @keyframes pulseShadow {
        0% {
            box-shadow: 0 2px 4px #d30930;
        }
        50% {
            box-shadow: 0 2px 15px #d30930;
        }
        100% {
            box-shadow: 0 2px 4px #d30930;
        }
    }
    animation: pulseShadow 1.5s 3;
`;

export default function Error(props) {
    console.log(props.error);
    return (
        <Wrapper>
            <p>
                Error {props.error.status}: {props.error.message.toUpperCase()}
            </p>
        </Wrapper>
    );
}
