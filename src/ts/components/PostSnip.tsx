/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: PostSnip.tsx
*/

// DEPENDENCIES
import * as React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

// CONTROLLERS
import Post from "../controllers/post_controller";

const PostSnipBody = styled("div")`
    background-color: #314455;
    color: #f5f5f5;
    display: grid;
    grid-template-columns: 100px 1fr;
    margin-bottom: 14px;
    box-shadow: 3px 3px 30px -20px black;
    border-radius: 4px;
    padding: 10px;
    position: relative;
    > a:nth-of-type(1) {
        position: absolute;
        right: -10px;
        top: -10px;
        background-color: #97aabd; 
        padding: 6px;
        border-radius: 30px;
        color: #f5f5f5;
    }
    
    > a:nth-of-type(2) {
        position: absolute;
        right: -10px;
        top: 30px;
        background-color: #97aabd; 
        padding: 6px;
        border-radius: 30px;
        color: #f5f5f5;
    }

`

const PostSnipContent = styled("div")`
    display: grid;
    aligh-items: end;
    grid-template-columns: 3fr 1fr;
    padding: 10px 10px 5px 10px;;
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
    div {
        display: flex;
        align-items: end;
    }
`;

interface PostData {
    id: string,
    title: string,
    content: string
}

const PostSnip: React.FunctionComponent<PostData> = ({ id, title, content }) => {
    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        setIsDeleted(true);
        Post.prototype.delete(id)
    }

    if (!isDeleted) {
        return (
            <PostSnipBody>
                <img src="./" />
                <PostSnipContent>
                    <h2>{title}</h2>
                    <p>{content}</p>
                    <div>
                        <Link to={`/posts/${id}`}>READ</Link>
                    </div>
                </PostSnipContent>
                <Link to={`/posts/edit/${id}`}><i className="fas fa-pen fa-1x"></i></Link>
                <Link onClick={handleDelete} to={`/categories`}><i className="far fa-trash-alt"></i></Link>
            </PostSnipBody>
        )
    } else {
        return null
    }
}

export default PostSnip;