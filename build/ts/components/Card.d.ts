import * as React from "react";
interface CategoryComponentData {
    catId: string;
    name: string;
    desc: string;
    count: number;
    img?: string;
    isAdmin: boolean;
    deleteCategory(catId: string): void;
    updateCategory(catId: string, name: string, desc: string): void;
}
declare const Card: React.FunctionComponent<CategoryComponentData>;
export default Card;
