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
import { CategoryData } from "../interfaces/category_interfaces";
import { UserComponentData } from "../interfaces/user_interfaces";

interface CategoriesViewComponent {
    user: UserComponentData;
}

const CategoriesView: React.FunctionComponent<CategoriesViewComponent> = ({ user }) => {
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
            { user.role === "administrator" ? <CreateBtn link="/categories/create" /> : null}
            <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />
            {categories.map((cat) => {
                let postCount = cat.posts.length;
                return <Card user={user} key={cat._id} count={postCount} catId={cat._id} name={cat.name} desc={cat.desc} img="/" />
            })}
        </Body>
    )
}

export default CategoriesView;