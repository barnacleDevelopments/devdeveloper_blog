/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import CategoryForm from "./CategoryForm";

// CONTROLERS
import Category from "../controllers/category_controller";

// INTERFACES 
import { NewCategoryData } from "../controllers/category_controller";

interface CategoryCreateViewComponent {
    user: { status: boolean, role: string }
}

// HOOKS 
import { Redirect } from "react-router-dom";

const Body = styled("section")`

`;



const CategoryCreateView: React.FunctionComponent<CategoryCreateViewComponent> = ({ user }) => {

    const handleFormData = (category: NewCategoryData) => {
        Category.prototype.create({
            name: category.name,
            desc: category.desc
        })
    }

    return (
        <Body>
            {user.role === "administrator" && user.status ? <CategoryForm name="" desc="" btnText="CREATE" submitFunc={handleFormData} />
                : <Redirect to="/categories" />}



        </Body>
    )
}

export default CategoryCreateView;