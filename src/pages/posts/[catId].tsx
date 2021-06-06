/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostsView.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType } from 'next'

// COMPONENTS
import PostSnip from "../../components/PostSnip"
import Title from "../../components/Title";
import PostSnipFallback from "../../components/PostSnipFallback";
import CreateBtn from "../../components/CreateBtn";
import PostForm from "../../components/PostForm";

// HOOKS
import useAuth from "../../hooks/useAuth";
import Category from "../../controllers/category_controller";
import usePosts from "../../hooks/usePosts";

const Body = styled("section")`

`;
const PostsView = ({ postList, catTitle }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { catId } = router.query
    const [createFormVisible, setCreateFormVisible] = useState<Boolean>(false);
    const { user, isAdmin } = useAuth();
    const { addPost, deletePost, updatePost, posts } = usePosts(postList);

    const togglePostCreateForm = () => {
        createFormVisible ? setCreateFormVisible(false) : setCreateFormVisible(true);
    }

    return (
        <Body>
            {/* CATEGORY NAME */}
            <Title title={catTitle} />
            {/* CREATE FORM */}
            {createFormVisible && (
                <PostForm
                    title=""
                    content=""
                    includesCategoryPicker={false}
                    btnText="Create"
                    cancelFunc={togglePostCreateForm}
                    submitFunc={(postData: PostFormData) => {
                        if (catId !== undefined)
                            addPost(postData.title, postData.content, catId)
                    }} />
            )}

            {/* if admin is logged in display create btn */}
            {(user && isAdmin) && (
                <CreateBtn
                    isDesktop={false}
                    togglePostCreateForm={togglePostCreateForm}
                />
            )}

            {/* if posts exists display them */}
            {posts.length <= 0 ? <PostSnipFallback /> :
                posts.map(post => {
                    return (
                        <PostSnip
                            key={post._id}
                            postId={post._id}
                            catId={post.catId}
                            title={post.title}
                            content={post.content}
                            updatePost={updatePost}
                            deletePost={deletePost}
                        />
                    );
                })}
        </Body>
    )
}

export async function getServerSideProps(context: any) {
    let catId = context.params.catId

    // retrieve all categories from api
    const postList = await Category.getPosts(catId);
    const category = await Category.getOne(catId);

    // pass them as props
    return {
        props: {
            catTitle: category.name,
            postList
        }
    }
}

export default PostsView;