import * as React from "react";
interface CategoryFormComponent {
    name: string;
    desc: string;
    btnText: string;
    isSubmited: boolean;
    submitFunc(data: NewCategoryData): void;
}
declare const CategoryForm: React.FunctionComponent<CategoryFormComponent>;
export default CategoryForm;
