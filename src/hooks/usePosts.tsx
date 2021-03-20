/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: usePosts.tsx
*/

import { useState, useContext } from "react";
import Post from "../controllers/post_controller";
import Category from "../controllers/category_controller";
import { RessourceId } from "../customTypings/global_types";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";

const usePosts = (initialCategories: any) => {
    const { addError } = useContext(ErrorContext)
    const [posts, setPosts] = useState<PostData[]>(initialCategories);

    const addPost = async (title: string, content: string, catId: RessourceId) => {
        let adjustedPostsList = posts;
        Post.prototype.create(title, content, catId)
            .then((data) => {
                if (data.status === "error" && data.message !== undefined) {
                    addError(data.message)
                } else {
                    adjustedPostsList = [data.data, ...adjustedPostsList];
                    setPosts(adjustedPostsList);
                }
            });
    }

    const getCategoryPosts = (catId: RessourceId) => {
        Category.prototype.getPosts(catId)
            .then(data => {
                if (data.status === "error" && data.message !== undefined) {
                    addError(data.message);
                } else {
                    setPosts(data.data);
                }
            })
    }

    const deletePost = (postId: RessourceId, catId: any) => {
        Post.prototype.delete(postId, catId)
            .then(data => {
                if (data.status === "error" && data.message !== undefined) {
                    addError(data.message);
                } else {
                    let newCatList = posts.filter(post => post._id === postId ? false : true);
                    setPosts(newCatList);
                }
            });
    }

    const updatePost = (postId: RessourceId, title: string, content: string) => {
        Post.prototype.update(postId, {
            title: title,
            content: content,
        }).then((data) => {
            if (data.status === "error" && data.message !== undefined) {
                addError(data.message);
            } else {
                let newPostList: PostData[] = posts.map(post => {
                    if (post._id === data.data._id) {
                        return data.data;
                    } else {
                        return post;
                    }
                });
                setPosts(newPostList);
            }
        })
    }

    return {
        posts,
        addPost,
        deletePost,
        getCategoryPosts,
        updatePost
    }
}

export default usePosts;
