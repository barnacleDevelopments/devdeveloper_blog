/*
AUTHOR: Devin Davis
DATE: January 6th, 2021
FILE: LoginForm.tsx
*/

import React, { useContext, useEffect, useRef } from "react";
import { Redirect } from "react-router";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

// CONTEXTS
import { UserContext } from "../contexts/UserContext";


interface PasswordFormComponent {
    cancelFunc(): void
}

const Body = styled("div")`
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    z-index: 998;
`;

const Shadow = styled("div")`
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.500);
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    position: fixed;
`;

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
    z-index: 999;
    position: relative;
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

const PasswordForm: React.FunctionComponent<PasswordFormComponent> = ({ cancelFunc }) => {
    const { register, handleSubmit, getValues, errors } = useForm();

    // user context
    const { isAuthenticated, changePassword } = useContext(UserContext);

    // submit user credentials
    const onSubmit = (data: UserPasswordChangeData) => {
        changePassword(data.oldPassword, data.newPassword)
    }

    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (usernameRef.current !== null) {
            register(usernameRef.current, { required: true })
            usernameRef.current.focus()
        }
    }, [])

    const passValOptions = {
        required: true,
        minLength: 8,
        maxLength: 20,
        validate: {
            passMatch: () => getValues("newPassword") === getValues("repeatPassword"),
            hasSpecial: () => {
                let specialCharecters = ["#", "@", "!", "$", "%", "^", "&", "*"]
                let passArr = getValues("newPassword").trim()
                return specialCharecters.some(el => passArr.includes(el));
            }
        }
    }

    return (
        <Body>
            <Shadow />
            <Form action="/changePassword" method="post" onSubmit={handleSubmit(onSubmit)}>
                <h1>Change Password</h1>
                <div>
                    <input
                        aria-invalid={errors.name ? "true" : "false"}
                        type="password"
                        name="oldPassword"
                        placeholder="Enter old password..."
                        ref={register({ required: true })} />
                </div>
                <div>
                    <input
                        aria-invalid={errors.name ? "true" : "false"}
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password..."
                        ref={register(passValOptions)} />
                </div>
                <div>
                    <input
                        aria-invalid={errors.name ? "true" : "false"}
                        type="password"
                        name="repeatPassword"
                        placeholder="Enter new password again..."
                        ref={register(passValOptions)} />
                </div>


                {/* ERROR MESSAGE DISPLAY */}
                {errors.newPassword && errors.newPassword.type === "maxLength" && (
                    <p>*Max password length exeeded.</p>
                )}
                {errors.newPassword && errors.newPassword.type === "minLength" && (
                    <p>*Password length too short.</p>
                )}
                {errors.newPassword && errors.newPassword.type === "passMatch" && (
                    <p>*Passwords must match.</p>
                )}
                {errors.newPassword && errors.newPassword.type === "hasSpecial" && (
                    <p>*Password must include at least one special character.</p>
                )}
                {((errors.oldPassword || errors.newPassword) && (errors.oldPassword.type === "required" || errors.newPassword === "required")) &&
                    <p>*All fields required.</p>}

                {/* REDIRECTS */}
                {isAuthenticated ? null : <Redirect to="/categories" />}
                <BtnGroup>
                    <button type="submit">Confirm</button>
                    <button onClick={cancelFunc} >Cancel</button>
                </BtnGroup>
            </Form>
        </Body>

    )
}

export default PasswordForm;
