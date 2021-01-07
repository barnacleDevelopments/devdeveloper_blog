import * as React from "react";
interface CategoryComponentData {
    id: string;
    name: string;
    desc: string;
    count: number;
    img: string;
    user: {
        role: string;
        status: boolean;
    };
}
declare const Card: React.FunctionComponent<CategoryComponentData>;
export default Card;
