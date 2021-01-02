/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Container.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

const ContainerBody = styled("div")`
    width: 95%;
    margin: 0 auto;
    margin-top: 74px;
`

const Container = (props) => (
    <ContainerBody>
        {props.children}
    </ContainerBody>
);

export default Container;