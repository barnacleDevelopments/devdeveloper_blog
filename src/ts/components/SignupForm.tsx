/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: SignupForm.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
/// CONTROLLERS
import User from "../controllers/user_controllers";

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
        margin-bottom: 10px;
        border-radius: 4px;
        height: 40px;
        width: 100%;
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
    p {
        margin-bottom: 13px;
    }


`;

interface SignupFormComponent {
    checkAuth(): void;
}

const SignupForm: React.FunctionComponent<SignupFormComponent> = ({ checkAuth }) => {
    const { register, getValues, handleSubmit, errors } = useForm();
    const [formSuccess, setFormSucess] = useState<Boolean>(false);

    const onSubmit = (data: NewUserFormData) => {
        User.prototype.signup(data.username, data.password)
            .then(data => {
                if (data.status === "success") {
                    setFormSucess(true);
                    checkAuth();
                } else {

                }
                console.log(data)
            })
    }

    return (
        <Form action="/signup" method="post" onSubmit={handleSubmit(onSubmit)}>
            {formSuccess ? <Redirect to="/categories" /> : null}
            <h1>SIGN UP</h1>
            <div>
                <input aria-invalid={errors.name ? "true" : "false"} type="text" name="username" placeholder="Enter username..." ref={register({ required: true, minLength: 6, maxLength: 20 })} />
                {/* ERROR MESSAGES */}
                {errors.username && (
                    <p>Field required.</p>
                )}
                {errors.username && errors.username.type === "maxLength" && (
                    <p>Max username length exeeded.</p>
                )}
                {errors.username && errors.username.type === "minLength" && (
                    <p>Username length is too short.</p>
                )}
            </div>
            <div>
                <input aria-invalid={errors.name ? "true" : "false"} type="text" name="password" placeholder="Enter password..." ref={register({
                    required: true, minLength: 8, maxLength: 20, validate: {
                        passMatch: () => getValues("password") === getValues("repeatPassword")
                    }
                })} />
                {/* ERROR MESSAGES */}
                {errors.password && (
                    <p>Field required.</p>
                )}
                {errors.password && errors.password.type === "maxLength" && (
                    <p>Max password length exeeded.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                    <p>Password length too short.</p>
                )}
            </div>
            <div>
                <input aria-invalid={errors.name ? "true" : "false"} type="text" name="repeatPassword" placeholder="Enter password..." ref={register({
                    required: true, minLength: 8, maxLength: 20, validate: {
                        passMatch: () => getValues("password") === getValues("repeatPassword")
                    }
                })} />
                {/* ERROR MESSAGES */}

                {errors.password && errors.password.type === "passMatch" && (
                    <p>Passwords must match</p>
                )}
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </Form>
    )
}

export default SignupForm;
