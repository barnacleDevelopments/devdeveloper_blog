/*
AUTHOR: Devin Davis
DATE: January 27th, 2021
FILE: useCategories.tsx
*/

import { useState, useContext, useEffect } from "react";
import Comment from "../controllers/comment_controller";

// CONTEXTS
import ErrorContext from "../contexts/ErrorContext";

/**
 * 
 * @param initialCategories 
 * @returns Category management utilities.
 * @description Category hook to to manage category state and make requests to controllers.
 */
const useCategories = (postId: RessourceId) => {
    const [comments, setComments] = useState<CommentComponentData[]>([]);
    const { addError } = useContext(ErrorContext);

    useEffect(() => {
        getComments();
    }, [])

    const getComments = async () => {
        await Comment.getFromPost(postId)
            .then(postComments => setComments(postComments))
            .catch(err => addError(err));
    }

    const createComment = async (postId: RessourceId, newComment: CommentFormData) => {
        await Comment.create(postId, newComment)
            .then(newComment => setComments([newComment, ...comments]))
            .catch(err => addError(err.message))
    }

    const updateComment = async (postId: RessourceId, updatedComment: CommentFormData) => {
        await Comment.update(postId, updatedComment)
            .then(updatedComment => {
                const updatedCommentList: CommentComponentData[] = comments.map(comment => (
                    comment._id === updatedComment._id ? updatedComment : comment
                ));
                setComments(updatedCommentList);
            }).catch(err => addError(err.message));
    }

    const deleteComment = async (commentId: RessourceId, postId: RessourceId) => {

        await Comment.delete(commentId, postId)
            .then(deletedComment => {
                const updatedCommentList: CommentComponentData[] = comments.filter(comment => {
                    comment._id !== deletedComment._id ?
                        true : false;
                });
                console.log(updatedCommentList)
                setComments(updatedCommentList);
            }).catch(err => addError(err.message));
    }

    return {
        comments,
        createComment,
        updateComment,
        deleteComment
    }
}

export default useCategories;
