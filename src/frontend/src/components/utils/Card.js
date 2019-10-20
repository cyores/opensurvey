import React from "react";
import styled from "styled-components";

// components
import Button from "./Button";
import Flex from "./Flex";

const StyledCard = styled.div`
    flex: 1 0 250px;
    height: 250px;
    max-width: 250px;
    margin: var(--space-sm);
    background: #fff;
    color: #000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    border-radius: 1rem;
    padding: var(--space-md);
`;

export default function Card(props) {
    return (
        <StyledCard>
            <Flex
                dir="col"
                style={{ height: "100%", justifyContent: "flex-end" }}
            >
                <div style={{ flex: "1 0" }}>
                    <h5>Image here</h5>
                </div>
                <div>
                    <h5 style={{ margin: 0 }}>{props.title}</h5>

                    <p>{props.desc}</p>

                    <Button theme="full" style={{ margin: 0 }}>
                        {props.buttonText}
                    </Button>
                </div>
            </Flex>
        </StyledCard>
    );
}
