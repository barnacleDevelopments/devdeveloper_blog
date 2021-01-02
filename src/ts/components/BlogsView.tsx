/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: BlogsView.tsx
*/

import * as React from "react";
import {FunctionComponent, useState, useEffect} from "react";
import styled from "@emotion/styled";
import { useLocation, useParams } from "react-router-dom";
//COMPONENTS
import BlogSnip from "./BlogSnip"
import CategoryTitle from "./CategoryTitle";

const Body = styled("section")`

`;


const BlogsView = () => {
    const [blogs, setBlogs] = useState([]);
    const url = useLocation();
    const { title } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000${url.pathname}`)
        .then(response => response.json())
        .then(data => setBlogs(data))
    }, [])

    return (
        <Body>
             <CategoryTitle title={title}/>
            {blogs.map(blog => {
                return (
                    <BlogSnip key={blog._id} id={blog._id} title={blog.title} content={blog.content} />
                )
            })}
        </Body>
    )
}

export default BlogsView;