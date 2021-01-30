import * as React from "react";
interface CategoryFormComponent {
    name: string;
    desc: string;
    btnText: string;
    submitFunc(data: NewCategoryData): void;
    cancleFunc(): void;
}
declare const CategoryForm: React.FunctionComponent<CategoryFormComponent>;
export default CategoryForm;
