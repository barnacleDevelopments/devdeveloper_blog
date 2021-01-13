/*
AUTHOR: Devin Davis
DATE: January 5th, 2021
FILE: PostCreateView.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import PostForm from "./PostForm";
import { Redirect, useParams } from "react-router-dom";

// CONTROLERS
import Post from "../controllers/post_controller";

// INTERFACES 
interface PostCreateViewComponent {
    user: UserComponentData;
}

interface Params {
    catId: string,
    postId: string
}

const Body = styled("section")`

`;

const PostCreateView: React.FunctionComponent<PostCreateViewComponent> = ({ user }) => {
    const [isSubmited, setIsSubmited] = useState(false);
    const { catId } = useParams<Params>()

    const handleFormData = (post: NewPostData) => {
        Post.prototype.create({
            title: post.title,
            content: post.content
        }, catId).then(() => setIsSubmited(true))
    }

    return (
        <Body>
            {user.role === "user" ?
                <Redirect to="/categories" /> : null}
            <PostForm isSubmited={isSubmited} subTitle="" catId={catId} title="Post title..." content="Post content..." btnText="CREATE" submitFunc={handleFormData} />
        </Body>
    )
}

export default PostCreateView;