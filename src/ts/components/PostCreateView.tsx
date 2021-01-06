/*
AUTHOR: Devin Davis
DATE: January 5th, 2021
FILE: PostCreateView.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import PostForm from "./PostForm";

// CONTROLERS
import Post from "../controllers/post_controller";

// INTERFACES
import { NewPostData } from "../controllers/post_controller";

const Body = styled("section")`

`;

const PostCreateView: React.FunctionComponent = () => {

    const handleFormData = (post: NewPostData) => {
        Post.prototype.create({
            title: post.title,
            content: post.content,
            catId: post.catId
        })
    }

    return (
        <Body>
            <PostForm subTitle="" postId="" title="" content="" btnText="CREATE" submitFunc={handleFormData} />
        </Body>
    )
}

export default PostCreateView;