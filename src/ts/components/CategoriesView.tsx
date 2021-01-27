/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: CategoryView.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import TextArea from "./TextArea";

// COMPONENTS
import Card from "./Card";
import CreateBtn from "./CreateBtn";
import FallbackMessage from "./FallbackMessage";

// HOOKS 
import useCategories from "../hooks/useCategories";

// STYLES 
const Body = styled("section")`
  
`;

// INTERFACES
interface CategoriesViewComponent {
    user: UserComponentData;
}

const CategoriesView: React.FunctionComponent<CategoriesViewComponent> = ({ user }) => {
    const { categories, deleteCategory } = useCategories();

    return (
        <Body>
            { user.role === "administrator" ? <CreateBtn link="/categories/create" /> : null}
            <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />
            {categories.length === 0 ? <FallbackMessage message="Failed to retrieve categories... Try refreshing the page." /> :
                categories.map((cat) => {
                    let postCount = cat.posts.length;
                    return <Card deleteCategory={deleteCategory} user={user} key={cat._id} count={postCount} catId={cat._id} name={cat.name} desc={cat.desc} img="/" />
                })}
        </Body>
    )
}

export default CategoriesView;