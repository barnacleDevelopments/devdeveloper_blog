/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: SignupForm.tsx
*/

import React from "react";
import styled from "@emotion/styled";

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


`;


const SignupForm: React.FunctionComponent = () => {

    return (
        <Form action="/signup" method="post">
            <h1>SIGN UP</h1>
            <div>
                <input type="text" name="username" placeholder="Enter username..." />
            </div>
            <div>
                <input type="text" name="password" placeholder="Enter password..." />
            </div>
            <div>
                <input type="text" name="password" placeholder="Enter password..." />
            </div>
            <div>
                <button type="submit">Sign Up</button>
            </div>
        </Form>
    )
}

export default SignupForm;
