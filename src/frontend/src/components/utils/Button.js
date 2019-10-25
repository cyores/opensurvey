import React from "react";
import styled from "styled-components";

const Base = styled.div`
    margin-right: var(--space-xs);
    margin-left: var(--space-xs);
    & > button {
        min-width: 3em;
        font-size: var(--text-base-size);
        border-radius: var(--text-xs);
        padding: var(--space-sm);
        margin: var(--sapce-sm);
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        outline: none;
        transition: all 0.15s ease-in-out;
        &:hover {
            box-shadow: inset 0 0 0 100vh rgba(255, 255, 255, 0.05),
                0 2px 4px var(--box-shadow-color);
        }
        &:active {
            box-shadow: inset 0 0 0 100vh rgba(0, 0, 0, 0.1);
        }
    }
`;

const Primary = styled.button`
    border: 1px solid var(--color-primary);
    background: var(--color-primary);
    color: #f6f1fd;
    &:hover {
        border: 1px solid var(--color-primary-light);
        --box-shadow-color: var(--color-primary);
    }
`;

const Complement = styled.button`
    border: 1px solid var(--color-complement);
    background: var(--color-complement);
    color: #f6f1fd;
    &:hover {
        border: 1px solid var(--color-complement);
        --box-shadow-color: var(--color-complement);
    }
`;

const Full = styled.button`
    border: 1px solid var(--color-primary);
    background: var(--color-primary);
    color: #f6f1fd;
    width: 100%;
    &:hover {
        border: 1px solid var(--color-primary-light);
        --box-shadow-color: var(--color-primary);
    }
`;

const FullOutline = styled.button`
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    width: 100%;
    &:hover {
        background: var(--color-primary);
        color: var(--color-text-light);
        --box-shadow-color: var(--color-primary);
    }
`;

const Outline = styled.button`
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    &:hover {
        background: var(--color-primary);
        color: var(--color-text-light);
        --box-shadow-color: var(--color-primary);
    }
`;

const Danger = styled.button`
    border: 1px solid #d30930;
    background: #d30930;
    color: #f6f1fd;
    &:hover {
        --box-shadow-color: #d30930;
    }
`;

const Disabled = styled.button`
    border: 1px solid #bcbcbc;
    background: #bcbcbc;
    &:hover {
        cursor: not-allowed;
    }
`;

export default function Button(props) {
    return (
        <>
            <Base
                onClick={props.onClick ? () => props.onClick() : null}
                style={props.style}
            >
                {props.theme === "primary" ? (
                    <Primary>{props.children}</Primary>
                ) : null}
                {props.theme === "complement" ? (
                    <Complement>{props.children}</Complement>
                ) : null}
                {props.theme === "full" ? <Full>{props.children}</Full> : null}
                {props.theme === "outline" ? (
                    <Outline>{props.children}</Outline>
                ) : null}
                {props.theme === "full-outline" ? (
                    <FullOutline>{props.children}</FullOutline>
                ) : null}
                {props.theme === "danger" ? (
                    <Danger>{props.children}</Danger>
                ) : null}
                {props.theme === "disabled" ? (
                    <Disabled disabled={props.disabled}>
                        {props.children}
                    </Disabled>
                ) : null}
                {!props.theme ? <Primary>{props.children}</Primary> : null}
            </Base>
        </>
    );
}
