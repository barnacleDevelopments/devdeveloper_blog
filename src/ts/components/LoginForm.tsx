/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: LoginForm.tsx
*/

import React, { useState } from "react";
import { Redirect } from "react-router";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// CONTROLLERS
import User from "../controllers/user_controllers";

interface LoginFormComponent {
    user: UserComponentData,
    checkAuth(): void
}

// STYLES
const Form = styled("form")`
    background-color: #314455;
    padding: 15px;
    color: #f5f5f5;
    border-radius: 4px;
    text-align: center;
    margin-top: 240px;
    h1 {
        font-size: 2.2em;
        margin-bottom: 16px;
        font-weight: bold;
    }
    input {
        padding-left: 14px;
        margin-bottom: 10px;
        border-radius: 4px;
        height: 40px;
        width: 100%;
    }
    button:nth-of-type(1) {
        margin-right: 10px;
    }
    button {
        border-radius: 4px;
        border: none;
        box-shadow: 3px 3px 30px -20px black;
        padding: 9px 14px 9px 14px;
        background-color: #9e5a63;
        color: #f5f5f5;
        font-weight: bold;
     
    }
    a {
        border-radius: 4px;
        border: none;
        box-shadow: 3px 3px 30px -20px black;
        padding: 9px 14px 9px 14px;
        background-color: #9e5a63;
        color: #f5f5f5;
        font-weight: bold;
        text-decoration: none;
    }
    p {
        padding-bottom: 13px;
    }


`;

const LoginForm: React.FunctionComponent<LoginFormComponent> = ({ checkAuth, user }) => {
    const { register, handleSubmit, errors } = useForm();
    const [formSuccess, setFormSucess] = useState<Boolean>(false);
    const [databaseErr, setDatabaseErr] = useState<String>()

    const onSubmit = (data: UserFormData) => {
        User.prototype.login(data.username, data.password)
            .then((data) => {
                if (data.status === "success") {
                    checkAuth();
                    setFormSucess(true);
                } else {
                    setDatabaseErr(data.message)
                }
            })
    }
    return (
        <Form action="/login" method="post" onSubmit={handleSubmit(onSubmit)}>
            {formSuccess ? <Redirect to="/categories" /> : null}
            <h1>LOGIN</h1>
            {user.status ? <Redirect to="/categories" /> : null}
            <div>
                <input placeholder="Username..." type="text" name="username" ref={register({ required: true, minLength: 6, maxLength: 20 })} />
            </div>
            <div>
                <input placeholder="Password..." type="password" name="password" ref={register({ required: true, minLength: 8, maxLength: 20 })} />
            </div>
            {(errors.username || errors.password) && (
                <p>*Password or username incorrect</p>
            )}
            {databaseErr && (
                databaseErr
            )}

            <div>
                <button type="submit">Login</button>
                <button><Link to="/signup">Sign up</Link></button>
            </div>
        </Form>
    )
}

export default LoginForm;
