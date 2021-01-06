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

const Body = styled("section")`

`;


const CategoryCreateView: React.FunctionComponent = () => {

    const handleFormData = (category: NewCategoryData) => {
        Category.prototype.create({
            name: category.name,
            desc: category.desc
        })
    }

    return (
        <Body>
            <CategoryForm name="" desc="" btnText="CREATE" submitFunc={handleFormData} />
        </Body>
    )
}

export default CategoryCreateView;