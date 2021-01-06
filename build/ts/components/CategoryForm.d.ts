import * as React from "react";
import { NewCategoryData } from "../controllers/category_controller";
interface CategoryFormData {
    name: string;
    desc: string;
    btnText: string;
    submitFunc(data: NewCategoryData): void;
}
declare const CategoryForm: React.FunctionComponent<CategoryFormData>;
export default CategoryForm;
