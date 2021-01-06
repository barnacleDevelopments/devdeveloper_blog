/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";
import PostForm from "./PostForm";

// CONTROLERS
import Post from "../controllers/post_controller";
import { NewPostData } from "../controllers/post_controller";

// INTERFACES 

interface ParamTypes {
    id: string
}

const Body = styled("section")`

`;

const PostEditView: React.FunctionComponent = () => {
    const [post, setPost] = useState<NewPostData>({
        title: "",
        content: "",
        catId: ""
    });
    const { id } = useParams<ParamTypes>();

    useEffect(() => {
        Post.prototype.getOne(id)
            .then(data => setPost(data))
    }, []);

    const handleFormData = (post: NewPostData) => {
        Post.prototype.update(id, {
            title: post.title,
            content: post.content,
            catId: ""
        })
    }

    return (
        <Body>
            <PostForm subTitle="" postId={id} title={post.title} content={post.content} btnText="UPDATE" submitFunc={handleFormData} />
        </Body>
    )
}

export default PostEditView;