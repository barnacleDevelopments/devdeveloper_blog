/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: AuthenticationView.tsx
*/

import React from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// COMPONENTS
import SignupForm from "./SignupForm";

//HOOKS
import useAuth from "../hooks/useAuth";

const Body = styled("section")`

`;

// INTERFACES 
interface SignupViewComponent {

}


const SignupView: React.FunctionComponent<SignupViewComponent> = () => {
    const { isAuthenticated } = useAuth()
    return (
        <Body>
            {isAuthenticated ?
                <Redirect to="/categories" /> : null}
            <SignupForm />
        </Body>
    )
}

export default SignupView;