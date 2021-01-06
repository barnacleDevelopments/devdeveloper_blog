/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: CategoryTitle.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

const Body = styled("div")`
    padding: 13px 10px 10px 10px;
    color: #f5f5f5;
    background-color: #9E5A63;
    width: 100%;
    height: 50px;
    font-weight: bold;
    font-size: 1.5em;
    text-transform: uppercase;
    margin-bottom: 14px;
    border-radius: 4px;
    display: flex;
    alight-items: center;
    justify-content: center;
    box-shadow: 3px 3px 30px -20px black;

`;

interface TitleData {
    title: string
}

const Title: React.FunctionComponent<TitleData> = ({ title }) => {
    return (
        <Body>
            <h1>{title}</h1>
        </Body>
    )
}

export default Title;