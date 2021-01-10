import { FunctionComponent } from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface MenuItem {
    link: string;
    name: string;
}
interface DropDownMenuInterface {
    menuItems: MenuItem[];
    user: UserComponentData;
}
declare const DropDownMenu: FunctionComponent<DropDownMenuInterface>;
export default DropDownMenu;
