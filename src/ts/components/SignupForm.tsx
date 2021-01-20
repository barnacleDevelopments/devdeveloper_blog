/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: SignupForm.tsx
*/

// DEPENDENCIES
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

// INTERFACES
interface SignupFormComponent {
    checkAuth(): void;
}

const SignupForm: React.FunctionComponent<SignupFormComponent> = ({ checkAuth }) => {
    // Client Side form validation hook
    const { register, getValues, handleSubmit, errors } = useForm();
    // Form submit status state
    const [formSuccess, setFormSucess] = useState<Boolean>(false);
    // Database error state
    const [databaseErr, setDatabaseErr] = useState<String>();

    // handle signup submit
    const onSubmit = (data: NewUserFormData) => {
        setDatabaseErr("");
        User.prototype.signup(data.username, data.password)
            .then(data => {
                if (data.status === "success") {
                    setFormSucess(true);
                    checkAuth();
                } else if (data.status === "failure") {
                    console.log("yup failed!")
                    setDatabaseErr(data.message)

                } else {
                    console.log("WTF")
                }
            })
    }

    return (
        <Form action="/signup" method="post" onSubmit={handleSubmit(onSubmit)}>
            {formSuccess ? <Redirect to="/categories" /> : null}
            <h1>SIGN UP</h1>
            <div>
                <input
                    aria-invalid={errors.name ? "true" : "false"} type="text"
                    name="username"
                    placeholder="Enter username..."
                    ref={register({
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        validate: {
                            passMatchUser: () => getValues("username") !== getValues("password")
                        }
                    })} />

                {/* ERROR MESSAGES DISPLAY */}
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
                                let passArr = getValues("password").trim().split("");
                                return passArr.includes("#", "@", "!", "$", "%", "^", "&", "*");
                            }
                        }
                    })} />

                {/* ERROR MESSAGES DISPLAY */}
                {errors.password && errors.password.type === "maxLength" && (
                    <p>*Max password length exeeded.</p>
                )}
                {errors.password && errors.password.type === "minLength" && (
                    <p>*Password length too short.</p>
                )}
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
                {databaseErr && (<p>{databaseErr}.</p>)}
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </Form>
    )
}

export default SignupForm;
