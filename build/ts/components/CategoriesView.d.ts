import * as React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface CategoriesViewComponent {
    user: UserComponentData;
}
declare const CategoriesView: React.FunctionComponent<CategoriesViewComponent>;
export default CategoriesView;
