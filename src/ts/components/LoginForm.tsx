/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: LoginForm.tsx
*/

import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// CONTROLLERS
import User from "../controllers/user_controllers";

// CONTEXTS
import { UserContext } from "../contexts/UserContext";

interface LoginFormComponent {
    user: UserComponentData
}

const BtnGroup = styled("div")`
    margin-top: 10px;

`

// STYLES
const Form = styled("form")`
    background-color: #314455;
    padding: 15px;
    color: #f5f5f5;
    border-radius: 4px;
    text-align: center;

    h1 {
        font-size: 2.2em;
        margin-bottom: 16px;
        font-weight: bold;
    }

    input {
        padding-left: 14px;
        margin-bottom: 15px;
        border-radius: 4px;
        height: 40px;
        width: 100%;
    }

    button:nth-of-type(1) {
        margin-right: 15px;
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

const LoginForm: React.FunctionComponent<LoginFormComponent> = ({ user }) => {
    const { register, handleSubmit, errors } = useForm();
    const [formSuccess, setFormSucess] = useState<Boolean>(false);
    const [databaseErr, setDatabaseErr] = useState<String>();


    // user context
    const { auth } = useContext(UserContext);

    // submit user credentials
    const onSubmit = (data: UserFormData) => {
        User.prototype.login(data.username, data.password)
            .then((data) => {
                if (data.status === "success") {
                    auth();
                    setFormSucess(true);
                } else {
                    setDatabaseErr(data.message)
                }
            })
    }
    return (
        <Form action="/login" method="post" onSubmit={handleSubmit(onSubmit)}>
            <h1>LOGIN</h1>
            <div>
                <input placeholder="Username..." type="text" name="username" ref={register({ required: true, minLength: 6, maxLength: 20 })} />
            </div>
            <div>
                <input placeholder="Password..." type="password" name="password" ref={register({ required: true, minLength: 8, maxLength: 20 })} />
            </div>

            {/* ERROR ELEMENTS */}
            {(errors.username || errors.password) && (
                <p>*Password or username incorrect</p>
            )}
            {databaseErr && (
                databaseErr
            )}

            {/* REDIRECTS */}
            {formSuccess || user.status ? <Redirect to="/categories" /> : null}
            <BtnGroup>
                <button type="submit"><a href="/" onClick={(e) => e.preventDefault()}>Login</a></button>
                <button><Link to="/signup">Sign up</Link></button>
            </BtnGroup>
        </Form>
    )
}

export default LoginForm;
