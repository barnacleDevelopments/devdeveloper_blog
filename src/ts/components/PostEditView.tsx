/*
AUTHOR: Devin Davis
DATE: January 1st, 2021
FILE: index.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useParams, Redirect } from "react-router-dom";
import PostForm from "./PostForm";

// CONTROLERS
import Post from "../controllers/post_controller";


// INTERFACES 
import { UserComponentData } from "../interfaces/user_interfaces";
import { EditPostData } from "../interfaces/post_interfaces";

interface Params {
    postId: string,
    catId: string
}

// INTERFACES 
interface EditViewComponent {
    user: UserComponentData
}

const Body = styled("section")`

`;

const PostEditView: React.FunctionComponent<EditViewComponent> = ({ user }) => {
    const [post, setPost] = useState<EditPostData>({
        title: "",
        content: "",
    });
    const [isSubmited, setIsSubmited] = useState(false);
    const { postId, catId } = useParams<Params>();

    useEffect(() => {
        Post.prototype.getOne(postId)
            .then(data => setPost(data))
    }, []);

    const handleFormData = (post: EditPostData) => {
        Post.prototype.update(postId, {
            title: post.title,
            content: post.content,
        }).then(() => setIsSubmited(true))
    }

    return (
        <Body>
            {user.role === "user" ?
                <Redirect to={`/categories`} /> : null}
            <PostForm isSubmited={isSubmited} subTitle="" catId={catId} title={post.title} content={post.content} btnText="UPDATE" submitFunc={handleFormData} />
        </Body>
    )
}

export default PostEditView;