import * as React from "react";
interface CategoriesViewComponent {
    user: {
        role: string;
        status: boolean;
    };
}
declare const CategoriesView: React.FunctionComponent<CategoriesViewComponent>;
export default CategoriesView;
