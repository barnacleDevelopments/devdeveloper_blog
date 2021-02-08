/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: SignupForm.tsx
*/

// DEPENDENCIES
import React, { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";

/// HOOKS
import useAuth from "../hooks/useAuth";

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

// INTERFACES
interface SignupFormComponent {

}

const SignupForm: React.FunctionComponent<SignupFormComponent> = () => {
    // Client Side form validation hook
    const { register, getValues, handleSubmit, errors } = useForm();

    // auth state 
    const { signup, userErrorMessage, isError, isAuthenticated } = useAuth()

    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (usernameRef.current !== null) {
            register(usernameRef.current, {
                required: true,
                minLength: 6,
                maxLength: 20,
                validate: {
                    passMatchUser: () => getValues("username") !== getValues("password")
                }
            })
            usernameRef.current.focus()
        }
    }, [])

    // handle signup submit
    const onSubmit = (data: NewUserFormData) => {
        signup(data.username, data.password)
    }

    return (
        <Form action="/signup" method="post" onSubmit={handleSubmit(onSubmit)}>
            {isAuthenticated ? <Redirect to="/login" /> : null}
            <h1>SIGN UP</h1>
            <div>
                <input
                    aria-invalid={errors.name ? "true" : "false"} type="text"
                    name="username"
                    placeholder="Enter username..."
                    ref={usernameRef} />

                {/* USERNAME ERROR MESSAGES DISPLAY */}
                {errors.username && errors.username.type === "maxLength" && (
                    <p>*Max username length exeeded.</p>
                )}
                {errors.username && errors.username.type === "minLength" && (
                    <p>*Username length is too short.</p>
                )}
            </div>
            <div>
                <input
                    aria-invalid={errors.name ? "true" : "false"}
                    type="password"
                    name="password"
                    placeholder="Enter password..."
                    ref={register({
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                        validate: {
                            passMatch: () => getValues("password") === getValues("repeatPassword"),
                            passMatchUser: () => getValues("username") !== getValues("password"),
                            hasSpecial: () => {
                                let specialCharecters = ["#", "@", "!", "$", "%", "^", "&", "*"]
                                let passArr = getValues("password").trim()
                                return specialCharecters.some(el => passArr.includes(el));
                            }
                        }
                    })} />
            </div>
            <div>
                <input
                    aria-invalid={errors.name ? "true" : "false"}
                    type="password"
                    name="repeatPassword"
                    placeholder="Enter password again..."
                    ref={register({
                        required: true, minLength: 8, maxLength: 20, validate: {
                            passMatch: () => getValues("password") === getValues("repeatPassword"),
                            passMatchUser: () => getValues("username") !== getValues("repeatPassword")
                        }
                    })} />

                {/* ERROR MESSAGE DISPLAY */}
                {errors.password && errors.password.type === "maxLength" && (
                    <p>*Max password length exeeded.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                    <p>*Password length too short.</p>
                )}
                {errors.password && errors.password.type === "passMatch" && (
                    <p>*Passwords must match.</p>
                )}
                {errors.password && errors.password.type === "passMatchUser" && (
                    <p>*Username & password cannot be the same.</p>
                )}
                {errors.password && errors.password.type === "hasSpecial" && (
                    <p>*Password must include at least one special character.</p>
                )}
                {(errors.username || errors.password) && <p>*All fields required.</p>}
                {isError && (<p>{userErrorMessage}.</p>)}
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </Form>
    )
}

export default SignupForm;
