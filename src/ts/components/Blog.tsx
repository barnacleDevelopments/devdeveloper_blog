/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: Blog.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";

const BlogBody = styled("article")`
    color: #f5f5f5;
    background-color: #9E5A63;
    padding: 15px 13px 10px 13px;
    text-align: center;
    border-radius: 4px;
    box-shadow: 3px 3px 30px -20px black;
    margin-bottom: 14px;

    img {
        margin: 15px 0px 15px 0px;
    }

    h1 {
        font-size: 2em;
        font-weight: bold;
    }

    h2 {
        font-size: 1.1em;
        font-style: italic;
    }

    p {
        font-size: 16px;
        text-align: left;
        font-weight: 100;
        line-height: 1.5;
    }
`;

const Blog = ({title, subTitle, content}) => {
    return (
        <BlogBody>
            <h1>{title}</h1>
            <h2>{subTitle}</h2>
            <img src="/"/>
            <p>{content}</p>
        </BlogBody>
    )
}

export default Blog;