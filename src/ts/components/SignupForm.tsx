/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: SignupForm.tsx
*/

import React from "react";


const SignupForm: React.FunctionComponent = () => {

    return (
        <form action="/signup" method="post">
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

export default SignupForm;
