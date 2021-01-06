/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Navbar.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

const TextAreaBody = styled("article")` 
    width: 100%;
    color: #f5f5f5;
    background-color: #9E5A63;
    padding: 15px 15px 15px 20px;
    margin-bottom: 14px;
    border-radius: 4px;
    box-shadow: 3px 3px 30px -20px black;
    h1 {
        font-size: 2em;
        margin: 5px 0px 10px 0px;
        font-weight: bold;
    }

    p {
        font-size: 16px;
        text-align: left;
        font-weight: 100;
        line-height: 1.5;
    }
`;

interface TextAreaData {
    title: string,
    content: string
}

const TextArea: React.FunctionComponent<TextAreaData> = ({ title, content }) => {
    return (
        <TextAreaBody>
            <h1>{title}</h1>
            <p>{content}</p>
        </TextAreaBody>
    )
}

export default TextArea;