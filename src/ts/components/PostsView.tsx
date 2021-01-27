/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostsView.tsx
*/

import * as React from "react";
import styled from "@emotion/styled";
import { useParams } from "react-router-dom";

//COMPONENTS
import PostSnip from "./PostSnip"
// import Title from "./Title";
import PostSnipFallback from "./PostSnipFallback";
import CreateBtn from "./CreateBtn";
import usePosts from "../hooks/usePosts";

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
    const { catId } = useParams<ParamTypes>();
    const { posts, deletePost } = usePosts();


    return (
        <Body>
            {user.role === "administrator" ? <CreateBtn link={`/posts/create/${catId}`} /> : null}

            {
                posts.length <= 0 ? <PostSnipFallback /> :
                    posts.map(post => {
                        return (
                            <PostSnip deletePost={deletePost} user={user} key={post._id} postId={post._id} catId={catId} title={post.title} content={post.content} />
                        );
                    })
            }
        </Body>
    )
}

export default PostsView;