import * as React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface NavComponent {
    user: UserComponentData;
}
declare const Navbar: React.FunctionComponent<NavComponent>;
export default Navbar;
