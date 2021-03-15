/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: AuthenticationView.tsx
*/

import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// COMPONENTS
import SignupForm from "./SignupForm";

// CONTEXT
import { UserContext } from "../contexts/UserContext";

const Body = styled("section")`

`;

// INTERFACES 
interface SignupViewComponent {

}


const SignupView: React.FunctionComponent<SignupViewComponent> = () => {
    const { isAuthenticated } = useContext(UserContext)

    return (
        <Body>
            {isAuthenticated ?
                <Redirect to="/categories" /> : null}
            <SignupForm />
        </Body>
    )
}

export default SignupView;