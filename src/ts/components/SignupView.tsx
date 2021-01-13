/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: AuthenticationView.tsx
*/

import React from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// COMPONENTS
import SignupForm from "./SignupForm"

const Body = styled("section")`

`;

// INTERFACES 
interface SignupViewComponent {
    user: UserComponentData;
}


const SignupView: React.FunctionComponent<SignupViewComponent> = ({ user }) => {





    return (
        <Body>
            {user.status ?
                <Redirect to="/categories" /> : null}
            <SignupForm />
        </Body>
    )
}

export default SignupView;