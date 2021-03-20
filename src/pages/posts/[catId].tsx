/*
AUTHOR: Devin Davis
DATE: January 2st, 2021
FILE: PostsView.tsx
*/

import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { InferGetStaticPropsType } from 'next'

// COMPONENTS
import PostSnip from "../../components/PostSnip"
// import Title from "./Title";
import PostSnipFallback from "../../components/PostSnipFallback";
import CreateBtn from "../../components/CreateBtn";
import PostForm from "../../components/PostForm";

// HOOKS
import useAuth from "../../hooks/useAuth";
import Category from "../../controllers/category_controller";
import usePosts from "../../hooks/usePosts";
import PostContext from "../../contexts/PostContext";

const Body = styled("section")`

`;
const PostsView = ({ postList }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { catId } = router.query
    const [createFormVisible, setCreateFormVisible] = useState<Boolean>(false);
    const { user, isAdmin } = useAuth();
    const postContextData = usePosts(postList);

    const toggleCreateForm = () => {
        createFormVisible ? setCreateFormVisible(false) : setCreateFormVisible(true);
    }

    return (
        <Body>
            <PostContext.Provider value={postContextData}>
                {/* CREATE FORM */}
                {createFormVisible ? <PostForm title="" content="" btnText="Create" cancleFunc={toggleCreateForm} submitFunc={(postData: PostFormData) => {
                    if (catId !== undefined)
                        postContextData.addPost(postData.title, postData.content, catId)
                }} /> : null}

                {/* if admin is logged in display create btn */}
                {(user && isAdmin) ? <CreateBtn func={toggleCreateForm} /> : null}

                {/* if posts exists display them */}
                {postContextData.posts.length <= 0 ? <PostSnipFallback /> :
                    postContextData.posts.map(post => {
                        return (
                            <PostSnip key={post._id} postId={post._id} title={post.title} content={post.content} />
                        );
                    })}
            </PostContext.Provider>
        </Body>
    )
}


export async function getStaticProps(context: any) {
    let catId = context.params.catId
    // retrieve all categories from api
    const postList = await Category.prototype.getPosts(catId);

    // pass them as props
    return {
        props: {
            postList
        }
    }
}


export async function getStaticPaths() {
    // get all category path ids
    const paths = await Category.prototype.getAll()
        .then(categories => categories.map(category => {
            return { params: { catId: category._id } }
        }))

    // return possible path ids
    return {
        paths: paths,
        fallback: false
    }

}


export default PostsView;