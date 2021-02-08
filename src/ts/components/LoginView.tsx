/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: AuthenticationView.tsx
*/

import React from "react";
import styled from "@emotion/styled";
import { Redirect } from "react-router-dom";

// COMPONENTS
import LoginForm from "./LoginForm"
import useAuth from "../hooks/useAuth";

// INTERFACES 
interface LoginViewComponent {

}

const Body = styled("section")`

`;


const LoginView: React.FunctionComponent<LoginViewComponent> = () => {
    const { isAuthenticated } = useAuth()
    return (
        <Body>
            {isAuthenticated ? <Redirect to="/categories" /> : null}
            <LoginForm />
        </Body>
    )
}

export default LoginView;
