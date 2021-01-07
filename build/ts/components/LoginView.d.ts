import React from "react";
interface LoginViewComponent {
    user: {
        status: boolean;
        role: string;
    };
}
declare const LoginView: React.FunctionComponent<LoginViewComponent>;
export default LoginView;
