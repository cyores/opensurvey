import React from "react";
import styled from "styled-components";

const PageTransitionSC = styled.div`
    @keyframes fadeIn {
        from {
            transform: translateY(-1%);
            opacity: 0;
        }
        to {
            transform: translateY(0%);
            opacity: 1;
        }
    }
    transform: translateY(0%);
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-timing-function: ease;
`;

export default function PageTransition(props) {
    return <PageTransitionSC>{props.children}</PageTransitionSC>;
}
