/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: LoginForm.tsx
*/

import React from "react";
import { Redirect } from "react-router";

// INTERFACES 
interface LoginFormComponent {
    user: { status: boolean, role: string }
}


const LoginForm: React.FunctionComponent<LoginFormComponent> = ({ user }) => {


    return (
        <form action="/login" method="post">
            {user.status ? <Redirect to="/categories" /> : null}
            <div>
                <label>Username:</label>
                <input type="text" name="username" />
            </div>
            <div>
                <label>Password:</label>
                <input type="text" name="password" />
            </div>
            <div>
                <button type="submit"></button>
            </div>
        </form>
    )
}

export default LoginForm;
