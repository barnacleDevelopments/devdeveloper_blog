/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: usePosts.tsx
*/

import { useState } from "react";
import Post from "../controllers/post_controller";
import Category from "../controllers/category_controller";

const usePosts = () => {
    const [posts, setPosts] = useState<PostData[]>([{
        _id: "",
        title: "",
        subTitle: "",
        content: "",
        date: "",
    }]);

    // retrive all the posts
    const addPost = (title: string, content: string, catId: string) => {
        let adjustedPostsList = posts;
        Post.prototype.create(title, content, catId)
            .then((post) => {
                console.log(post)
                adjustedPostsList = [post, ...adjustedPostsList]
                setPosts(adjustedPostsList);
            });
    }

    const getCategoryPosts = (catId: string) => {
        Category.prototype.getPosts(catId)
            .then(data => setPosts(data))
    }

    const deletePost = (postId: string, catId: string) => {
        Post.prototype.delete(postId, catId)
            .then(() => {
                let newCatList = posts.filter(post => post._id === postId ? false : true);
                setPosts(newCatList);
            });
    }

    const updatePost = (postId: string, title: string, content: string) => {
        Post.prototype.update(postId, {
            title: title,
            content: content,
        }).then((updatedPost) => {
            let newPostList: PostData[] = posts.map(post => {
                console.log(post._id, updatedPost._id)
                if (post._id === updatedPost._id) {
                    console.log(post, updatedPost)
                    return updatedPost;
                } else {
                    return post;
                }
            });
            setPosts(newPostList);
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
