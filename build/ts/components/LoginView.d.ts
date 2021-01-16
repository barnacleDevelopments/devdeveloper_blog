import React from "react";
interface LoginViewComponent {
    user: UserComponentData;
    checkAuth(): void;
}
declare const LoginView: React.FunctionComponent<LoginViewComponent>;
export default LoginView;
