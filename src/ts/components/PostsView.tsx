/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostsView.tsx
*/

import * as React from "react";
import {useState, useEffect} from "react";
import styled from "@emotion/styled";
import { useLocation, useParams } from "react-router-dom";

//COMPONENTS
import PostSnip from "./PostSnip"
import Title from "./Title";
import PostSnipFallback from "./PostSnipFallback";
import CreateBtn from "./CreateBtn";

// CONTROLERS
import Category from "../controllers/category_controller";
const Body = styled("section")`

`;
const PostsView = () => {
    const [posts, setPosts] = useState([]);
    const [catTitle, setCatTitle] = useState("")
    const { id } = useParams();

    useEffect(() => {
        Category.prototype.getPosts(id)
        .then(data => {
            setPosts(data.posts)
            setCatTitle(data.name)
        })
    }, [])

    return (
        <Body>
            <CreateBtn link={`/posts/create/${id}`} />
             <Title title={catTitle}/>
            {
                posts.length <= 0 ? <PostSnipFallback /> :
                posts.map(post => {
                    return (
                        <PostSnip key={post._id} id={post._id} title={post.title} content={post.content} />
                    );
                })
            }
        </Body>
    )
}

export default PostsView;