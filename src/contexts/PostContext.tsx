/*
AUTHOR: Devin Davis
DATE: January 31st, 2021
FILE: PostContext.tsx
*/


import { createContext } from "react";

interface PostsContextData {
    posts: PostData[],
    addPost(title: string, content: string, catId: RessourceId): void,
    getCategoryPosts(catId: RessourceId): void,
    deletePost(postId: RessourceId, catId: RessourceId): void,
    updatePost(postId: RessourceId, title: string, content: string): void
}

export const PostsContextDefaultValue: PostsContextData = {
    posts: [{
        _id: "",
        title: "",
        content: "",
        date: "",
        catId: ""
    }],
    addPost: () => null,
    deletePost: () => null,
    getCategoryPosts: () => null,
    updatePost: () => null
}

export default createContext(PostsContextDefaultValue);