/*
AUTHOR: Devin Davis
DATE: January 25th, 2021
FILE: FallbackMessage.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

const Body = styled("div")`
    color: #f5f5f5;
    text-align: center;
    font-size: 2em;
    h2 {
        margin-top: 30px;
    }
`;

interface FallbackComponent {
    message: string;
}

const FallbackMessage: React.FunctionComponent<FallbackComponent> = ({ message }) => {
    return (
        <Body>
            <h2>{message}</h2>
        </Body>
    )
}

export default FallbackMessage;