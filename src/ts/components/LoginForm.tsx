/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: LoginForm.tsx
*/

import React, { useContext, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

// CONTEXTS
import { UserContext } from "../contexts/UserContext";

interface LoginFormComponent {

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
    min-width: 270px;
    box-shadow: 1px 1px 5px 0px #00000040;
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

    div {
        display: flex;
        justify-content: center;
        gap: 14px;
    }

    button {
        color: #f5f5f5;
        background-color: #9e5a63;
        padding: 9px 14px 9px 14px;
        border-radius: 4px;
        text-decoration: none;
        border: none;
        box-shadow: 1px 1px 5px 0px #00000030;
        font-weight: bold;
    }

    p {
        padding-bottom: 13px;
    }
`;

const LoginForm: React.FunctionComponent<LoginFormComponent> = () => {
    const { register, handleSubmit } = useForm();

    // user context
    const { login, isAuthenticated, isError, setIsError } = useContext(UserContext);

    // submit user credentials
    const onSubmit = (data: UserFormData) => {
        login(data.username, data.password)
    }

    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (usernameRef.current !== null) {
            register(usernameRef.current, { required: true })
            usernameRef.current.focus()
        }
    }, [])

    return (
        <Form action="/login" method="post" onSubmit={handleSubmit(onSubmit)}>
            <h1>LOGIN</h1>
            <div>
                <input onInput={() => setIsError(false)} placeholder="Username..." type="text" name="username" ref={usernameRef} />
            </div>
            <div>
                <input onInput={() => setIsError(false)} placeholder="Password..." type="password" name="password" ref={
                    register({ required: true })} />
            </div>

            {/* ERROR ELEMENTS */}
            {(isError) && (
                <p>*password or username is incorrect</p>
            )}

            {/* REDIRECTS */}
            {isAuthenticated ? <Redirect to="/categories" /> : null}
            <BtnGroup>
                <button type="submit">Login</button>
                <Link to="/signup"><button>Sign up</button></Link>
            </BtnGroup>
        </Form>
    )
}

export default LoginForm;
