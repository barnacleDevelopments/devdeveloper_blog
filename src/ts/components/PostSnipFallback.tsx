/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: PostSnipFallback.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import { useState } from "react/cjs/react.development";

const Body = styled("div")`
    color: #f5f5f5;
    text-align: center;
    font-size: 2em;
`;

const PostSnipFallback = () => {
    const [userRole, setUserRole] = useState();


    return (
        <Body>
            <h2>Nothing to see here... <br/> checking later for some new articles!</h2>
        </Body>
    )
}

export default PostSnipFallback;