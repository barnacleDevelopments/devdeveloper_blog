/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: usePosts.tsx
*/

import { useState } from "react";
import Post from "../controllers/post_controller";
import Category from "../controllers/category_controller";

const usePosts = () => {
    const [posts, setPosts] = useState<PostData[]>([]);

    // retrive all the posts
    const addPost = (newPost: PostData) => {
        let adjustedPostsList = posts;
        adjustedPostsList.push(newPost);
        setPosts(adjustedPostsList);
    }

    const getCategoryPosts = (catId: string) => {
        Category.prototype.getPosts(catId)
            .then(data => setPosts(data))
            .catch(() => {

            })
    }

    const deletePost = (postId: string, catId: string) => {
        Post.prototype.delete(postId, catId)
            .then(() => {
                let newCatList = posts.filter(post => post._id === postId ? false : true);
                setPosts(newCatList);
            });
    }

    const getPost = () => {

    }

    const getAllPosts = () => {

    }

    return {
        posts,
        addPost,
        deletePost,
        getCategoryPosts,
        getPost,
        getAllPosts
    }
}

export default usePosts;
