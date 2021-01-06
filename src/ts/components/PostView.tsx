/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostView.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

// CONTROLLERS
import Post from "../controllers/post_controller";

//COMPONENTS
import PostBody from "./PostBody";
// import Comment from "./Comment";
import Title from "./Title";
import CommentForm from "./CommentForm";

// INTERFACES 
interface ParamTypes {
    id: string
}

const Body = styled("section")`

`;

const PostView: React.FunctionComponent = () => {
    const [post, setPost] = useState({ title: "", content: "", date: "" });
    const { id } = useParams<ParamTypes>();

    useEffect(() => {
        Post.prototype.getOne(id)
            .then((post) => {
                setPost(post);
            }).catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <Body>
            <PostBody id={id} date={post.date} title={post.title} content={post.content} subTitle={""} />

            <Title title="COMMENTS" />
            <CommentForm username="" />
        </Body>
    )
}

export default PostView;