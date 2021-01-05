/*
AUTHOR: Devin Davis
DATE: January 4th, 2021
FILE: InputView.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

// COMPONENTS 
import TextProcessor from "./TextProcessor";
import Title from "./Title";

const Body = styled("section")`

`;

const CreateView = () => {
    return (
        <Body>
            <Title title="CREATE POST" />
            <TextProcessor title="type title here..." subTitle="type sub title here..." content="type body content here..." btnText="POST"></TextProcessor>
        </Body>
    )
}

export default CreateView;