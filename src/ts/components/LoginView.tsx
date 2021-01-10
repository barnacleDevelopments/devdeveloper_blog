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

// INTERFACES
import { UserComponentData } from "../interfaces/user_interfaces";

// INTERFACES 
interface LoginViewComponent {
    user: UserComponentData;
}

const Body = styled("section")`

`;


const LoginView: React.FunctionComponent<LoginViewComponent> = ({ user }) => {

    return (
        <Body>
            {user.status ? <Redirect to="/categories" /> : null}
            <LoginForm user={user} />
        </Body>
    )
}

export default LoginView;
