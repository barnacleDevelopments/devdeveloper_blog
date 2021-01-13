/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import CategoryForm from "./CategoryForm";

// CONTROLERS
import Category from "../controllers/category_controller";

// HOOKS 
import { Redirect } from "react-router-dom";

// INTERFACES 
interface CategoryCreateViewComponent {
    user: UserComponentData
}

const Body = styled("section")`

`;

const CategoryCreateView: React.FunctionComponent<CategoryCreateViewComponent> = ({ user }) => {

    const [isSubmited, setIsSubmited] = useState(false);

    const handleFormData = (category: NewCategoryData) => {
        Category.prototype.create({
            name: category.name,
            desc: category.desc
        }).then(() => setIsSubmited(true))
    }

    return (
        <Body>
            {user.role === "administrator" && user.status ? <CategoryForm isSubmited={isSubmited} name="Category name..." desc="Category description..." btnText="CREATE" submitFunc={handleFormData} />
                : <Redirect to="/categories" />}
        </Body>
    )
}

export default CategoryCreateView;