import React from "react";
interface LoginFormComponent {
    user: UserComponentData;
    checkAuth(): void;
}
declare const LoginForm: React.FunctionComponent<LoginFormComponent>;
export default LoginForm;
