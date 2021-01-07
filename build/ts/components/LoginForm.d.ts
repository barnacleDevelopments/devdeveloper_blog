import React from "react";
interface LoginFormComponent {
    user: {
        status: boolean;
        role: string;
    };
}
declare const LoginForm: React.FunctionComponent<LoginFormComponent>;
export default LoginForm;
