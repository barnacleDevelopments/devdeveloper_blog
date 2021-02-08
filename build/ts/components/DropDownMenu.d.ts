import { FunctionComponent } from "react";
interface MenuItem {
    link: string;
    name: string;
    func?(): any;
}
interface DropDownMenuInterface {
    menuItems: MenuItem[];
}
declare const DropDownMenu: FunctionComponent<DropDownMenuInterface>;
export default DropDownMenu;
