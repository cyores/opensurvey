import React from "react";
import styled from "styled-components";

// components
import Flex from "./Flex";

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: var(--space-md);
    &:hover {
        * {
            opacity: 1;
        }
    }
`;

const StyledTextarea = styled.textarea`
    min-height: var(--text-lg);
    flex: 6 0 300px;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid var(--color-shadow);
    padding: var(--space-sm);
    outline: none;
    transition: all 0.15s ease-in-out;
    &:focus {
        border: 1px solid var(--color-shadow);
        box-shadow: 0 2px 6px var(--color-shadow);
    }
`;

const Label = styled.label`
    flex: 1 0 50px;
    display: inline-block;
    padding: var(--space-sm);
    transition: opacity 0.15s ease-in-out;
`;

export default function Textarea(props) {
    const { type, placeholder, defaultValue, step, onChange, label } = props;
    return (
        <Wrapper>
            <Flex>
                <Label>{label}</Label>
                <StyledTextarea
                    rows="5"
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    step={step}
                    onChange={onChange}
                ></StyledTextarea>
            </Flex>
        </Wrapper>
    );
}
