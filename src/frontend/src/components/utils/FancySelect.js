import React, { useState, useRef } from "react";
import styled from "styled-components";

// components
import Flex from "./Flex";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    margin-bottom: var(--space-md);
    color: var(--color-light-text);
    transition: all 0.25s ease-in-out;
    &:hover {
        * {
            opacity: 1;
        }
    }
`;

const StyledSelect = styled.div`
    // flex: 6 0 300px;
    flex: 6 0 150px;
    font-size: var(--text-base-size);
    border-radius: 1rem;
    background: ${props => (props.open ? "#fff" : "rgba(255, 255, 255, 0.75)")};
    border: 1px solid var(--color-shadow);
    border-bottom-left-radius: ${props => (props.open ? "0" : "1rem")};
    border-bottom-right-radius: ${props => (props.open ? "0" : "1rem")};
    padding: var(--space-sm);
    outline: none;
    transition: all 0.25s ease-in-out;
    &:focus {
        border: 1px solid var(--color-shadow);
        box-shadow: 0 2px 6px var(--color-shadow);
    }
    &:after {
        position: absolute;
        content: "";
        top: calc(55% + 6px);
        right: 10px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-color: #000 transparent transparent transparent;
    }
`;

const Label = styled.label`
    // flex: 1 0 50px;
    flex: 1 0 25px;
    display: inline-block;
    padding: var(--space-sm);
    color: var(--color-text);
    transition: all 0.25s ease-in-out;
`;

const LabelTop = styled.label`
    flex: 1 1 100%;
    display: block;
    padding: 0;
    color: var(--color-text);
    transition: all 0.25s ease-in-out;
`;

const ItemsWrapper = styled.div`
    position: relative;
    // because select has --space-sm padding
    width: calc(100% + (2 * var(--space-sm)));
    margin-left: calc(-1 * var(--space-sm) - 1px);
`;

const Items = styled.div`
    position: absolute;
    top: calc(100% + var(--space-sm));
    width: 100%;
    padding-bottom: 1.05rem;
    background: rgba(255, 255, 255, 1);
    border: 1px solid var(--color-shadow);
    border-top: 1px solid transparent;
    margin-top: -1px;
    border-radius: 1rem;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-shadow: 0 2px 6px var(--color-shadow);
    transition: all 0.25s ease-in-out;
`;

const Item = styled.div`
    padding: var(--space-sm);
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
        background: var(--color-primary-transparent);
    }
`;

export default function FancySelect(props) {
    const { defaultValue, label, options, labelTop } = props;
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultValue || options[0]);
    const selectRef = useRef(null);
    const optionSelected = opt => {
        setValue(opt);
        setOpen(false);
        selectRef.current.value = opt;
        if (props.onChange) {
            props.onChange({ target: selectRef.current });
        }
    };
    return (
        <Wrapper>
            <select ref={selectRef} style={{ display: "none" }}>
                {options.map((option, i) => (
                    <option key={`${label}-aoption-${i}`} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <Flex>
                {labelTop ? (
                    <LabelTop>{label}</LabelTop>
                ) : (
                    <Label>{label}</Label>
                )}
                <StyledSelect open={open} onClick={() => setOpen(!open)}>
                    {value}

                    {open && (
                        <ItemsWrapper>
                            <Items>
                                {options.map((option, i) => (
                                    <Item
                                        key={`${label}-voption-${i}`}
                                        onClick={() => optionSelected(option)}
                                    >
                                        {option}
                                    </Item>
                                ))}
                            </Items>
                        </ItemsWrapper>
                    )}
                </StyledSelect>
            </Flex>
        </Wrapper>
    );
}
