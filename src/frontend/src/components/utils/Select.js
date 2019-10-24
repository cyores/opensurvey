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

const StyledSelect = styled.select`
    flex: 6 0 300px;
    font-size: var(--text-base-size);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    padding: var(--space-xs);
    outline: none;
    transition: all 0.15s ease-in-out;
    &:focus {
        border: 1px solid var(--color-primary);
    }
`;

const Label = styled.label`
    flex: 1 0 50px;
    display: inline-block;
    padding: var(--space-xs);
`;

const LabelTop = styled.label`
    flex: 1 1 100%;
    display: block;
    padding: 0;
`;

export default function Select(props) {
    const { defaultValue, label, options, multiple, labelTop } = props;

    return (
        <Wrapper>
            <Flex>
                {labelTop ? (
                    <LabelTop>{label}</LabelTop>
                ) : (
                    <Label>{label}</Label>
                )}
                <StyledSelect
                    defaultValue={defaultValue}
                    multiple={multiple}
                    onChange={props.onChange}
                >
                    {options.map((option, i) => (
                        <option key={`qtype-option-${i}`} value={option}>
                            {option}
                        </option>
                    ))}
                </StyledSelect>
            </Flex>
        </Wrapper>
    );
}
