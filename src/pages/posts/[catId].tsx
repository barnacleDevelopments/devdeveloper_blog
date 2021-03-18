/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostsView.tsx
*/

import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

// CONTEXTS 
import PostContext from "../../contexts/PostContext";

// COMPONENTS
import PostSnip from "../../components/PostSnip"
// import Title from "./Title";
import PostSnipFallback from "../../components/PostSnipFallback";
import CreateBtn from "../../components/CreateBtn";
import usePosts from "../../hooks/usePosts";
import PostForm from "../../components/PostForm";

// HOOKS
import useAuth from "../../hooks/useAuth";

const Body = styled("section")`

`;
const PostsView: React.FunctionComponent = () => {
    const router = useRouter();
    const { catId } = router.query
    const [createFormVisible, setCreateFormVisible] = useState<Boolean>(false);
    const PostContextData = usePosts();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        PostContextData.getCategoryPosts(catId);
    }, []);

    const toggleCreateForm = () => {
        createFormVisible ? setCreateFormVisible(false) : setCreateFormVisible(true);
    }

    return (
        <Body>
            <PostContext.Provider value={PostContextData}>
                {/* CREATE FORM */}
                {createFormVisible ? <PostForm title="" content="" btnText="Create" cancleFunc={toggleCreateForm} submitFunc={(postData: PostFormData) => PostContextData.addPost(postData.title, postData.content, catId)} /> : null}

                {/* if admin is logged in display create btn */}
                {(user && !isLoading) ? <CreateBtn func={toggleCreateForm} /> : null}

                {/* if posts exists display them */}
                {PostContextData.posts.length <= 0 ? <PostSnipFallback /> :
                    PostContextData.posts.map(post => {
                        return (
                            <PostSnip key={post._id} postId={post._id} title={post.title} content={post.content} />
                        );
                    })}
            </PostContext.Provider>
        </Body>
    )
}

export default PostsView;