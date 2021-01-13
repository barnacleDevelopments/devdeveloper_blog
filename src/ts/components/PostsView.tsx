/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostsView.tsx
*/

import * as React from "react";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

//COMPONENTS
import PostSnip from "./PostSnip"
import Title from "./Title";
import PostSnipFallback from "./PostSnipFallback";
import CreateBtn from "./CreateBtn";

// CONTROLERS
import Category from "../controllers/category_controller";

// INTERFACES
interface ParamTypes {
    catId: string
}

// INTERFACES 
interface PostsViewComponent {
    user: UserComponentData;
}

const Body = styled("section")`

`;
const PostsView: React.FunctionComponent<PostsViewComponent> = ({ user }) => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [catTitle, setCatTitle] = useState("")
    const { catId } = useParams<ParamTypes>();

    useEffect(() => {
        Category.prototype.getPosts(catId)
            .then(data => {
                setPosts(data.posts)
                setCatTitle(data.name)
            })
    }, [])

    return (
        <Body>
            {user.role === "administrator" ? <CreateBtn link={`/posts/create/${catId}`} /> : null}
            <Title title={catTitle} />
            {
                posts.length <= 0 ? <PostSnipFallback /> :
                    posts.map(post => {
                        return (
                            <PostSnip user={user} key={post._id} postId={post._id} catId={catId} title={post.title} content={post.content} />
                        );
                    })
            }
        </Body>
    )
}

export default PostsView;