import React, { useState } from "react";
import styled from "styled-components";

// components
import Flex from "./utils/Flex";
import { NavLink } from "react-router-dom";
import Toggle from "./utils/Toggle";

const Wrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    height: 7vh;
    max-height: 7vh;
    background: var(--color-primary);
    @media only screen and (max-width: 450px) {
        height: 9vh;
        max-height: 9vh;
    }
`;

const Item = styled.div`
    margin: var(--space-sm);
    color: #fff;
`;

const Logo = styled.div`
    font-size: var(--text-xl);
    padding-top: var(--space-xs);
    color: #fff;
    transition: all 0.25s ease-in-out;
`;

// const StyledNavLink = styled.div`
//     font-size: var(--text-md);
//     padding: var(--space-sm);
//     color: var(--color-complement);
//     cursor: pointer;
//     transition: all 0.25s ease-in-out;
//     &:hover {
//         box-shadow: inset 0 -0.5vh 0 0 var(--color-complement);
//         color: var(--color-complement);
//     }
// `;

export default function Header() {
    const darkOnDefault = true;
    const defaultTheme = darkOnDefault ? "dark" : "light";
    const [theme, setTheme] = useState(defaultTheme);
    return (
        <Wrapper>
            <div style={{ flex: "1 1 auto" }}>
                <Flex dir="rowleft">
                    <Item>
                        <NavLink
                            exact
                            to="/"
                            style={{ textDecoration: "none" }}
                        >
                            <Logo>Open Survey</Logo>
                        </NavLink>
                    </Item>
                </Flex>
            </div>
            <div style={{ flex: "1 1 auto" }}>
                <Flex dir="rowright">
                    {/* <Item>
                        <NavLink
                            exact
                            to="/"
                            style={{ textDecoration: "none" }}
                        >
                            <StyledNavLink>Home</StyledNavLink>
                        </NavLink>
                    </Item> */}
                    {/* <Item>
                        <NavLink
                            exact
                            to="/about"
                            style={{ textDecoration: "none" }}
                        >
                            <StyledNavLink>About</StyledNavLink>
                        </NavLink>
                    </Item> */}
                    <Item>
                        <Toggle
                            defaultChecked={darkOnDefault}
                            onChange={input => {
                                if (input.target.checked) {
                                    setTheme("dark");
                                } else {
                                    setTheme("light");
                                }
                            }}
                            label="Theme"
                        />
                    </Item>
                    {theme === "dark" && (
                        <style>{`
                                    :root {--color-bg: #000; --color-text-dark: #f6f1fd; --color-text-light: #000}
                                `}</style>
                    )}
                    {theme === "light" && (
                        <style>{`
                                    :root {--color-bg: #fff; --color-text-dark: #000; --color-text-light: #f6f1fd}
                                `}</style>
                    )}
                </Flex>
            </div>
        </Wrapper>
    );
}
