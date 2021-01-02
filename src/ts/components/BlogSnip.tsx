/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: BlogSnip.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const BlogSnipBody = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    display: grid;
    grid-template-columns: 100px 1fr;
    margin-bottom: 14px;
    box-shadow: 3px 3px 30px -20px black;
    border-radius: 4px;
    padding: 10px;

`

const BlogSnipContent = styled("div")`
    display: grid;
    aligh-items: end;
    grid-template-columns: 3fr 1fr;
    padding: 10px 10px 15px;
    h2 {
        font-size: 1.8em;
        grid-column: 1 / span 2;
        font-weight: bold;
        margin-bottom: 10px;
    }
    p {
        grid-column: 1;
    }
    a {
        background-color: #9E5A63;
        border-radius: 4px;
        padding: 6px 20px;
        box-shadow: 3px 3px 30px -10px black;
        display: inline-block;
        grid-column: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80px;
        height: 30px;
        text-decoration: none;
        color: #f5f5f5;
    }
    
    > div {
        display: flex;
        align-items: end;
    }
`;

const BlogSnip = ({id, title, content}) => {
    return (
        <BlogSnipBody>
            <img src="./"/>
            <BlogSnipContent>
                <h2>{title}</h2>
                <p>{content}</p>
                <div>
                    <Link to={`/blog/${title}/${id}`}>READ</Link>
                </div>
            </BlogSnipContent>
        </BlogSnipBody>    
    )
}

export default BlogSnip;