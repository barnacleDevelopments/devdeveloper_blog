import { createContext } from "react";

interface PostContextData {
    posts: PostData[],
    addPost(title: string, content: string, catId: string): void,
    getCategoryPosts(catId: string): void,
    deletePost(postId: string, catId: string): void,
    updatePost(postId: string, title: string, content: string): void,
    getAllPosts(): void

}

export const PostContextDefaultValue: PostContextData = {
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
    getAllPosts: () => null

}

export default createContext(PostContextDefaultValue);