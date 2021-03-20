/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Container.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

// COMPONENTS 
import Navbar from "../components/Navbar";
import Head from "next/head"


const ContainerBody = styled("div")`
    width: 90%;
    margin: 0 auto;
    margin-top: 85px;
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
const Container: React.FunctionComponent = ({ children }) => (
    <ContainerBody>
        <Head>
            <title>devdeveloper_blog</title>
        </Head>
        <Navbar />
        {children}
    </ContainerBody>
);

export default Container