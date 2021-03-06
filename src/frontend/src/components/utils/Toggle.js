import React from "react";
import styled from "styled-components";
import Flex from "./Flex";

const Switch = styled.label`
    position: relative;
    display: inline-block;
    width: calc(var(--text-xl) * 2);
    height: var(--text-xl);
    outline: none;
    & > input {
        opacity: 0;
        width: 0;
        height: 0;
    }
`;

const Slider = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: var(--text-xl);
    background-color: #ccc;
    transition: 0.1s linear;
    outline: none;
    &:before {
        position: absolute;
        content: "";
        height: calc(var(--text-xl) - 8px);
        width: calc(var(--text-xl) - 8px);
        left: 4px;
        bottom: 4px;
        border-radius: 50%;
        background-color: white;
        transition: 0.1s linear;
    }
`;

const Checkbox = styled.input`
    outline: none;
    &:checked + span {
        background-color: var(--color-primary);
        background-color: var(--color-complement);
    }
    &:checked + span:before {
        transform: translateX(
            calc((var(--text-xl) * 2) - (var(--text-xl) - 8px) - 8px)
        );
    }
`;

export default function Toggle(props) {
    return (
        <div style={props.style}>
            <Flex dir="colcenter">
                {props.label && <small style={{...props.labelStyle, lineHeight: 1}}>{props.label}</small>}
                <Switch>
                    <Checkbox
                        type="checkbox"
                        defaultChecked={props.defaultChecked}
                        onChange={props.onChange}
                    ></Checkbox>
                    <Slider></Slider>
                </Switch>
            </Flex>
        </div>
    );
}
