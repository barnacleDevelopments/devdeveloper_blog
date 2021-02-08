/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: usePosts.tsx
*/

import { useState, useContext } from "react";
import Post from "../controllers/post_controller";
import Category from "../controllers/category_controller";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";

const usePosts = () => {
    const { addError } = useContext(ErrorContext)
    const [posts, setPosts] = useState<PostData[]>([{
        _id: "",
        title: "",
        content: "",
        date: "",
    }]);

    const addPost = (title: string, content: string, catId: string) => {
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

    const getCategoryPosts = (catId: string) => {
        Category.prototype.getPosts(catId)
            .then(data => {
                if (data.status === "error" && data.message !== undefined) {
                    addError(data.message);
                } else {
                    setPosts(data.data);
                }
            })
    }

    const deletePost = (postId: string, catId: string) => {
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

    const updatePost = (postId: string, title: string, content: string) => {
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

    const getAllPosts = () => {

    }

    return {
        posts,
        addPost,
        deletePost,
        getCategoryPosts,
        updatePost,
        getAllPosts

    }
}

export default usePosts;
