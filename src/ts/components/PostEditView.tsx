/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import * as  ReactDOM from "react-dom";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import PostForm from "./PostForm";

// CONTROLERS
import Post from "../controllers/post_controller";

const Body = styled("section")`

`;

const PostEditView = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        Post.prototype.getOne(id)
        .then(data => setPost(data))
    }, []);

   const handleFormData = (post) => {
        Post.prototype.update(id, {
            title: post.title,
            content: post.content
        })
    }
       
    return (
        <Body>
            <PostForm postId={id} title={post.title} content={post.content} btnText="UPDATE" submitFunc={handleFormData}/>
        </Body>
    )
}

export default PostEditView;