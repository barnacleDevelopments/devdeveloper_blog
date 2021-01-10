import React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface LoginFormComponent {
    user: UserComponentData;
}
declare const LoginForm: React.FunctionComponent<LoginFormComponent>;
export default LoginForm;
