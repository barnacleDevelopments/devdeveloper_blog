import * as React from "react";
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
