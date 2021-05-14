/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

// DEPENDENCIES
import React, { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";

// FONT AWESOME 
import { faImage, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

const Body = styled("div")`
 width: 100%;
 background-color: #314455; 
 height: 60px;
 display: flex;

`;

const FormatBtn = styled("div")`
    width: 60px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f5f5f5;
    font-size: 1.5em;
    font-weight: bold;
    :hover {
        background-color: #f5f5f540;
    }

    svg {
        width: 25px;
    }
`;

const EditBar: FunctionComponent = () => {
    const selectedBtn = useState();

    return (
        <Body>
            <FormatBtn>B</FormatBtn>
            <FormatBtn>I</FormatBtn>
            <FormatBtn>U</FormatBtn>
            <FormatBtn><Icon icon={faImage}></Icon></FormatBtn>
            <FormatBtn><Icon icon={faLink}></Icon></FormatBtn>
            <FormatBtn>{"{ }"}</FormatBtn>
        </Body >
    );
}

export default EditBar;