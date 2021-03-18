/*
AUTHOR: Devin Davis
DATE: January 31st, 2021
FILE: PostContext.tsx
*/


import { createContext } from "react";

interface PostsContextData {
    posts: PostData[],
    addPost(title: string, content: string, catId: string): void,
    getCategoryPosts(catId: string): void,
    deletePost(postId: string, catId: string): void,
    updatePost(postId: string, title: string, content: string): void,
    getAllPosts(): void

}

export const PostsContextDefaultValue: PostsContextData = {
    posts: [{
        _id: "",
        title: "",
        content: "",
        date: ""
    }],
    addPost: () => null,
    deletePost: () => null,
    getCategoryPosts: () => null,
    updatePost: () => null,
    getAllPosts: () => null,


}

export default createContext(PostsContextDefaultValue);