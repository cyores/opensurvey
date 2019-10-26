import React from "react";
import styled from "styled-components";

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
    const { title, desc, buttonText, open, close } = props;
    return (
        <StyledCard>
            <Flex
                dir="col"
                style={{ height: "100%", justifyContent: "flex-end" }}
            >
                <div style={{ padding: "var(--space-sm)" }}>
                    <h5 style={{ margin: 0 }}>{title}</h5>

                    {desc ? <p>{desc}</p> : <p>No description.</p>}

                    {/* {open && <p>Open: {new Date(open).toString()}</p>} */}
                    {/* {close && <p>Close: {new Date(close).toString()}</p>} */}

                    <Button theme="full" style={{ margin: 0 }}>
                        {buttonText}
                    </Button>
                </div>
            </Flex>
        </StyledCard>
    );
}
