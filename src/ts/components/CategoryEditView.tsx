/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Redirect, useParams } from "react-router-dom";
import CategoryForm from "./CategoryForm";

// CONTROLERS
import Category from "../controllers/category_controller";

// INTERFACES 
interface ParamTypes {
    catId: string
}

interface CategoryEditViewComponent {
    user: UserComponentData;
}

const Body = styled("section")`

`;

const CategoryEditView: React.FunctionComponent<CategoryEditViewComponent> = ({ user }) => {
    const [category, setCategory] = useState<NewCategoryData>({
        name: "",
        desc: ""
    });
    const [isSubmited, setIsSubmited] = useState(false);
    const { catId } = useParams<ParamTypes>();

    useEffect(() => {
        Category.prototype.getOne(catId)
            .then(data => {
                setCategory(data)
            })
    }, []);

    const handleFormData = (category: NewCategoryData) => {
        Category.prototype.update(catId, {
            name: category.name,
            desc: category.desc
        }).then(() => setIsSubmited(true))
    }

    return (
        <Body>
            {user.role === "user" ?
                <Redirect to="/categories" /> : null}
            <CategoryForm isSubmited={isSubmited} name={category.name} desc={category.desc} btnText="UPDATE" submitFunc={handleFormData} />
        </Body>
    )
}

export default CategoryEditView;