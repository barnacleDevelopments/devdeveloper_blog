/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: usePosts.tsx
*/

// DEPENDENCIES
import { useState, useContext } from "react";
import Post from "../controllers/post_controller";
import Category from "../controllers/category_controller";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";

/**
 * 
 * @param initialPosts 
 * @returns Post management utilities.
 * @description Post hook to to manage post state and make requests to controlers.
 */
const usePosts = (initialPosts: any) => {
    const [posts, setPosts] = useState<PostData[]>(initialPosts);
    const { addError } = useContext(ErrorContext)

    /**
     * 
     * @param title post title
     * @param content post content
     * @param catId post's category ID
     * @description add a new post to category.
     */
    const addPost = (title: string, content: string, catId: RessourceId) => {
        let adjustedPostsList = posts;
        Post.create(title, content, catId)
            .then((data) => {
                adjustedPostsList = [data, ...adjustedPostsList];
                setPosts(adjustedPostsList);
            }).catch(err => addError(err.message));
    }

    /**
    * 
    * @param catId category's ID
    * @description get all posts associated with a category.
    */
    const getCategoryPosts = (catId: RessourceId) => {
        Category.getPosts(catId)
            .then(data => setPosts(data))
            .catch(err => addError(err.message))
    }

    /**
    * 
    * @param title post title
    * @param content post content
    * @param postId post's ID
    * @description update existing post.
    */
    const updatePost = (postId: RessourceId, title: string, content: string) => {
        Post.update(postId, {
            title: title,
            content: content,
        }).then((data) => {
            let newPostList: PostData[] = posts.map(post => (
                post._id === data._id ? data : post
            ));
            setPosts(newPostList);
        }).catch(err => addError(err.message));
    }

    /**
    * 
    * @param postId post's ID
    * @param catId category's ID
    * @description delete post.
    */
    const deletePost = (postId: RessourceId, catId: any) => {
        Post.delete(postId, catId)
            .then(() => {
                const newPostList: PostData[] = posts.filter(post => (
                    post._id === postId ? false : true
                ));
                setPosts(newPostList);
            }).catch(err => addError(err.message))
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
