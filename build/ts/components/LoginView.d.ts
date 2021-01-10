import React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface LoginViewComponent {
    user: UserComponentData;
}
declare const LoginView: React.FunctionComponent<LoginViewComponent>;
export default LoginView;
