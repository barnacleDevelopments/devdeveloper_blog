/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: CategoryView.tsx
*/

import * as React from "react";
import {FunctionComponent, useState, useEffect} from "react";
import styled from "@emotion/styled";
import TextArea from "./TextArea";

// COMPONENTS
import Card from "./Card";


// STYLES 
const Body = styled("section")`

`;


const CategoriesView = () => {
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(data => setCategories(data))
        console.log(categories)
    }, [])
  
    return (
        <Body>
            <TextArea title="Welcome to my Blog" content="A collection of articles for techies, fitness junkies and more!" />
            {categories.map((cat) => {
                return <Card key={cat._id} id={cat._id} name={cat.name} desc={cat.desc} img="/"/>
                })}
        </Body>
    )
}

export default CategoriesView;