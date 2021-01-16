import React from "react";
interface NavComponent {
    user: UserComponentData;
    checkAuth(): void;
}
declare const Navbar: React.FunctionComponent<NavComponent>;
export default Navbar;
