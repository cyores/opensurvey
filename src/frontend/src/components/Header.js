import React from "react";
import styled from "styled-components";

// components
import Flex from "./utils/Flex";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
`;

const Item = styled.div`
    margin: var(--space-sm);
`;

const Logo = styled.div`
    font-size: var(--text-xl);
    padding-top: var(--space-xs);
`;

const StyledNavLink = styled.div`
    font-size: var(--text-md);
    padding: var(--space-sm);
    color: var(--color-text-dark);
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
        box-shadow: inset 0 -0.5vh 0 0 var(--color-primary);
        color: var(--color-primary);
    }
`;

export default function Header(props) {
    return (
        <Wrapper>
            <div style={{ flex: "1 1 auto" }}>
                <Flex dir="rowleft">
                    <Item>
                        <Logo>Open Survey</Logo>
                    </Item>
                </Flex>
            </div>
            <div style={{ flex: "1 1 auto" }}>
                <Flex dir="rowright">
                    <Item>
                        <NavLink
                            exact
                            to="/"
                            style={{ textDecoration: "none" }}
                        >
                            <StyledNavLink>Home</StyledNavLink>
                        </NavLink>
                    </Item>
                    <Item>
                        <NavLink
                            exact
                            to="/about"
                            style={{ textDecoration: "none" }}
                        >
                            <StyledNavLink>About</StyledNavLink>
                        </NavLink>
                    </Item>
                </Flex>
            </div>
        </Wrapper>
    );
}
