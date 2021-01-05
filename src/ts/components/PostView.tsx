/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostView.tsx
*/

import * as React from "react";
import {useState, useEffect} from "react";
import styled from "@emotion/styled";
import { useLocation, useParams } from "react-router-dom";

// CONTROLLERS
import Post from "../controllers/post_controller";

//COMPONENTS
import PostBody from "./PostBody";
import Comment from "./Comment";
import Title from "./Title";
import CommentForm from "./CommentForm";

const Body = styled("section")`

`;

const PostView = () => {
    const [post, setPost] = useState({title: "", content: ""});
    const { id } = useParams();

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
            <PostBody id={id} date={post.date} title={post.title} content={post.content} subTitle={""}/>
            
            <Title title="COMMENTS" />
            <CommentForm/>
        </Body>
    )
}

export default PostView;