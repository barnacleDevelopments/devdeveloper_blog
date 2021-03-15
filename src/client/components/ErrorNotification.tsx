/*
AUTHOR: Devin Davis
DATE: January 31st, 2021
FILE: CreateBtn.tsx
*/

import React, { FunctionComponent } from "react";
import styled from "@emotion/styled";

const Body = styled("div")`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f5f5f5;
    background-color: #9e5a63;
    width: 95%;
    z-index: 10000;
    position: fixed;
    bottom: 14px;
`;

interface ErrorComponentData {
    error: string
}

const ErrorNotification: FunctionComponent<ErrorComponentData> = ({ error }) => {
    return (
        <Body>{error}</Body>
    )
}

export default ErrorNotification;