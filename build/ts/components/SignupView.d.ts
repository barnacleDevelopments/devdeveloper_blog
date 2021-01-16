import React from "react";
interface SignupViewComponent {
    user: UserComponentData;
    checkAuth(): void;
}
declare const SignupView: React.FunctionComponent<SignupViewComponent>;
export default SignupView;
