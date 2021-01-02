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
import Blog from "./Blog";

const Body = styled("section")`

`;

const BlogView = () => {
    const [blog, setBlog] = useState({title: "", content: ""});
    const url = useLocation();
    
    useEffect(() => {
        fetch(`http://localhost:3000${url.pathname}`)
        .then(response => response.json())
        .then(data => setBlog(data))
    }, [])

    return (
        <Body>
            <Blog title={blog.title} content={blog.content} subTitle={""}/>
        </Body>
    )
}

export default BlogView;