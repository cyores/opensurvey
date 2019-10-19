import React from "react";
import styled from "styled-components";

const FlexRow = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
`;

const FlexRowLeft = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
`;

const FlexRowRight = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
`;

const FlexCol = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
`;

const FlexColCenter = styled.div`
    display: flex;
    flex-flow: column wrap;
    justify-content: space-around;
    align-items: center;
`;

export default function Flex(props) {
    if (props.dir === "col") {
        return <FlexCol style={props.style}>{props.children}</FlexCol>;
    } else if (props.dir === "colcenter") {
        return (
            <FlexColCenter style={props.style}>{props.children}</FlexColCenter>
        );
    } else if (props.dir === "rowleft") {
        return <FlexRowLeft style={props.style}>{props.children}</FlexRowLeft>;
    } else if (props.dir === "rowright") {
        return (
            <FlexRowRight style={props.style}>{props.children}</FlexRowRight>
        );
    }
    return <FlexRow style={props.style}>{props.children}</FlexRow>;
}
