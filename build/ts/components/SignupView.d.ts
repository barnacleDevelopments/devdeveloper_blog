import React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface SignupViewComponent {
    user: UserComponentData;
}
declare const SignupView: React.FunctionComponent<SignupViewComponent>;
export default SignupView;
