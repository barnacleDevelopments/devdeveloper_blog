/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: AuthenticationView.tsx
*/

import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// COMPONENTS
import LoginForm from "./LoginForm";

// CONTEXT
import { UserContext } from "../contexts/UserContext";

// INTERFACES 
interface LoginViewComponent {

}

const Body = styled("section")`

`;


const LoginView: React.FunctionComponent<LoginViewComponent> = () => {
    const { isAuthenticated } = useContext(UserContext)

    return (
        <Body>
            {isAuthenticated ? <Redirect to="/categories" /> : null}
            <LoginForm />
        </Body>
    )
}

export default LoginView;
