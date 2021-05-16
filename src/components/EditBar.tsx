/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: TextProcessor.tsx
*/

// DEPENDENCIES
import React, { FunctionComponent, useEffect, useState } from "react";
import styled from "@emotion/styled";

// FONT AWESOME 
import { faImage, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'

interface editBarProps {
    focusTextBody(): void
    isCap: boolean
}

const Body = styled("div")`
    width: 100%;
    background-color: #314455; 
    height: 60px;
    display: flex;
    position: absolute;
    align-items: center;
    a {
        text-decoration: none;
    }
`;

const FormatBtn = styled("a")`
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

const HeadingSelect = styled("select")`
    width: 50px;
    height: 28px;
    margin-left: 10px;
    font-weight: bold;
    background-color: #97aabd;
    border: none;
    border-radius: 4px;
    color: #f5f5f5;
    padding: 4px;

`;

const IsCapWarning = styled("div")`
    color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    background-color: #9e5a63;
    padding: 10px;
    border-radius: 4px;
    margin-left: 10px;
`;

const EditBar: FunctionComponent<editBarProps> = ({ focusTextBody, isCap }) => {
    const selectedBtn = useState();

    const format = (command: string, value?: string) => {
        focusTextBody();
        document.execCommand(command, false, value);
    }


    // function setUrl() {
    //     var url = document.getElementById('txtUrl').value || "";
    //     var sText = document.getSelection();

    //     document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
    //     //format('createlink', url);
    // }


    const setHeading = (headingType: string) => {
        focusTextBody();
        document.execCommand("heading", false, headingType)
    }


    return (
        <Body>
            <FormatBtn href="javascript:void(0)" onClick={() => format("bold")}>B</FormatBtn>
            <FormatBtn href="javascript:void(0)" onClick={() => format("italic")}>I</FormatBtn>
            <FormatBtn href="javascript:void(0)" onClick={() => format("underline")}>U</FormatBtn>
            {/* <FormatBtn><Icon icon={faImage}></Icon></FormatBtn>
            <FormatBtn href="javascript:void(0)" onClick={() => format("")}><Icon icon={faLink}></Icon></FormatBtn>
            <FormatBtn>{"{ }"}</FormatBtn> */}
            <HeadingSelect>
                <option onClick={(e) => setHeading("H1")}>H1</option>
                <option onClick={(e) => setHeading("H2")}>H2</option>
                <option onClick={(e) => setHeading("H3")}>H3</option>
                <option onClick={(e) => setHeading("H4")}>H4</option>
            </HeadingSelect>

            { isCap && (<IsCapWarning>CAPS ON</IsCapWarning>)}
        </Body >
    );
}

export default EditBar;