/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: CategoryView.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import TextArea from "./TextArea";
import Category from "../controllers/category_controller";

// COMPONENTS
import Card from "./Card";
import CreateBtn from "./CreateBtn";

// STYLES 
const Body = styled("section")`

`;

// INTERFACES
import { CategoryData } from "../controllers/category_controller";

const CategoriesView: React.FunctionComponent = () => {
    const [categories, setCategories] = useState<CategoryData[]>([{
        _id: "",
        name: "",
        desc: "",
        count: 0,
        img: "",
        posts: [{
            _id: "",
            title: "",
            subTitle: "",
            content: "",
            catId: "",
            date: ""
        }]
    }]);

    useEffect(() => {
        Category.prototype.getAll()
            .then(data => setCategories(data))
    }, []);

    return (
        <Body>
            <CreateBtn link="/categories/create" />
            <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />
            {categories.map((cat) => {
                let postCount = cat.posts.length;
                return <Card key={cat._id} count={postCount} id={cat._id} name={cat.name} desc={cat.desc} img="/" />
            })}
        </Body>
    )
}

export default CategoriesView;