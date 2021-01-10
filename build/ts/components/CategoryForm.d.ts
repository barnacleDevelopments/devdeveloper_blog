import * as React from "react";
import { NewCategoryData } from "../interfaces/category_interfaces";
interface CategoryFormComponent {
    name: string;
    desc: string;
    btnText: string;
    isSubmited: boolean;
    submitFunc(data: NewCategoryData): void;
}
declare const CategoryForm: React.FunctionComponent<CategoryFormComponent>;
export default CategoryForm;
