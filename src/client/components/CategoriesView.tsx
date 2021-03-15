/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: CategoryView.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import TextArea from "./TextArea";

// COMPONENTS
import Card from "./Card";
import CreateBtn from "./CreateBtn";
import FallbackMessage from "./FallbackMessage";

// HOOKS 
import useCategories from "../hooks/useCategories";
import CategoryForm from "./CategoryForm";
import useAuth from "../hooks/useAuth";

// STYLES 
const Body = styled("section")`
  
`;

// INTERFACES
interface CategoriesViewComponent {

}

const CategoriesView: React.FunctionComponent<CategoriesViewComponent> = () => {
    // category hook 
    const { categories, deleteCategory, addCategory, updateCategory } = useCategories();

    // form visibility state
    const [createFormVisible, setCreateFormVisible] = useState<Boolean>(false);

    // authentication authorization hook
    const { isLoading, isAuthenticated, isAdmin } = useAuth();


    // form toggling function 
    const toggleCreateForm = () => {
        createFormVisible ? setCreateFormVisible(false) : setCreateFormVisible(true)
    }

    return (
        <Body>
            {/* CREATE FORM */}
            {createFormVisible ? <CategoryForm btnText="Create" name="" desc="" submitFunc={(formData) => addCategory(formData.name, formData.desc)} cancelFunc={toggleCreateForm} /> : null}

            {/* CREATE BUTTON */}
            { (isAuthenticated && !isLoading && isAdmin) && <CreateBtn func={toggleCreateForm} />}
            <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />

            {/* FALLBACK MESSAGE */}
            {categories.length === 0 ? <FallbackMessage message="Failed to retrieve categories... Try refreshing the page." /> :

                /* DISPLAY CATEGORY CARDS*/
                categories.map((cat) => {
                    let postCount = cat.posts.length;
                    return <Card deleteCategory={deleteCategory} updateCategory={updateCategory} isAdmin={isAdmin} key={cat._id} count={postCount} catId={cat._id} name={cat.name} desc={cat.desc} img="/" />
                })}
        </Body>
    )
}

export default CategoriesView;