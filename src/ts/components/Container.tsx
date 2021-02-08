/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Container.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

const ContainerBody = styled("div")`
    width: 93%;
    margin: 0 auto;
    margin-top: 74px;
    padding-bottom: 14px;

    @media (min-width: 576px) {
        width: 85%;
    }

    @media (min-width: 768px) {
        width: 75%;
    }

    @media (min-width: 992px) {
        width: 65%;
    }

    @media (min-width: 1200px) {
        width: 50%;
    }
`
const Container: React.FunctionComponent = (props) => (
    <ContainerBody>
        {props.children}
    </ContainerBody>
);

export default Container