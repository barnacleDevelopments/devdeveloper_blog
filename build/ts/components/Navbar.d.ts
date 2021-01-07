import * as React from "react";
interface NavComponent {
    user: {
        status: boolean;
        role: string;
    };
}
declare const Navbar: React.FunctionComponent<NavComponent>;
export default Navbar;
