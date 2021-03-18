/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: CategoryView.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";

// COMPONENTS
import Card from "../components/Card";
import TextArea from "../components/TextArea";
import CreateBtn from "../components/CreateBtn";
import FallbackMessage from "../components/FallbackMessage";
import CategoryForm from "../components/CategoryForm";

// HOOKS 
import useCategories from "../hooks/useCategories";
import useAuth from "../hooks/useAuth";


// STYLES 
const Body = styled("section")`
  
`;

export default function CategoriesPage() {
  // category hook 
  const { categories, deleteCategory, addCategory, updateCategory } = useCategories();

  // form visibility state
  const [createFormVisible, setCreateFormVisible] = useState<Boolean>(false);

  // authentication authorization hook
  const { isLoading } = useAuth();


  // form toggling function 
  const toggleCreateForm = () => {
    createFormVisible ? setCreateFormVisible(false) : setCreateFormVisible(true)
  }

  return (
    <Body>
      {/* CREATE FORM */}
      {createFormVisible ? <CategoryForm btnText="Create" name="" desc="" submitFunc={(formData) => addCategory(formData.name, formData.desc)} cancelFunc={toggleCreateForm} /> : null}

      {/* CREATE BUTTON */}
      { (!isLoading) && <CreateBtn func={toggleCreateForm} />}
      <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />

      {/* FALLBACK MESSAGE */}
      {categories.length === 0 ? <FallbackMessage message="Failed to retrieve categories... Try refreshing the page." /> :

        /* DISPLAY CATEGORY CARDS*/
        categories.map((cat) => {
          let postCount = cat.posts.length;
          return <Card deleteCategory={deleteCategory} updateCategory={updateCategory} key={cat._id} count={postCount} catId={cat._id} name={cat.name} desc={cat.desc} img="/" />
        })}
    </Body>
  )
}



