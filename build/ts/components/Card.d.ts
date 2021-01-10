import * as React from "react";
import { UserComponentData } from "../interfaces/user_interfaces";
interface CategoryComponentData {
    catId: string;
    name: string;
    desc: string;
    count: number;
    img: string;
    user: UserComponentData;
}
declare const Card: React.FunctionComponent<CategoryComponentData>;
export default Card;
