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

const StyledInput = styled.input`
    flex: 6 0 300px;
    font-size: var(--text-base-size);
    height: var(--text-lg);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    padding: var(--space-xs);
    outline: none;
    transition: all 0.25s ease-in-out;
    &:focus {
        border: 1px solid var(--color-primary);
    }
`;

const Label = styled.label`
    flex: 1 0 50px;
    display: inline-block;
    padding: var(--space-xs);
`;

export default function Input(props) {
    const { type, placeholder, defaultValue, step, onChange, label } = props;
    return (
        <Wrapper>
            <Flex>
                <Label>{label}</Label>
                <StyledInput
                    type={type}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    step={step}
                    onChange={onChange}
                ></StyledInput>
            </Flex>
        </Wrapper>
    );
}
