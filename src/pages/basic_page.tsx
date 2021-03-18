/*
AUTHOR: Devin Davis
DATE: Febuary 15th, 2021
FILE: BasicView.tsx
*/

// import React, { useContext } from "react";
import styled from "@emotion/styled";
// import { Redirect } from "react-router-dom";

// CONTEXTS
// import { UserContext } from "../contexts/UserContext";


const Body = styled("section")`

`;

// INTERFACES 
interface BasicViewComponent {
    authRedirect?: string
}

const BasicView: React.FunctionComponent<BasicViewComponent> = (props) => {
    // const { isAuthenticated } = useContext(UserContext)
    return (
        <Body>
            {/* {isAuthenticated ?
                <Redirect to={`/${props.authRedirect}`} /> : null} */}
            {props.children}
        </Body>
    )
}

export default BasicView;