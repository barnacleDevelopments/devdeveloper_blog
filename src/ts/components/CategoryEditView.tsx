/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";

// CONTROLERS
import Category from "../controllers/category_controller";

// INTERFACES 
import { NewCategoryData } from "../controllers/category_controller";

interface ParamTypes {
    id: string
}
const Body = styled("section")`

`;

const CategoryEditView: React.FunctionComponent = () => {
    const [category, setCategory] = useState<NewCategoryData>({
        name: "",
        desc: ""
    });
    const { id } = useParams<ParamTypes>();

    useEffect(() => {
        Category.prototype.getOne(id)
            .then(data => setCategory(data))
    }, []);

    const handleFormData = (category: NewCategoryData) => {
        Category.prototype.update(id, {
            name: category.name,
            desc: category.desc
        })
    }

    return (
        <Body>
            <CategoryForm name={category.name} desc={category.desc} btnText="UPDATE" submitFunc={handleFormData} />
        </Body>
    )
}

export default CategoryEditView;