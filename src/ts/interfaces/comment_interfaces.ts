/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: comment_interfaces.ts
*/

// INTERFACES
export interface CommentData {
    _id: string,
    content: string,
    date: string,
    userId: string,
    postId: string,
}

export interface NewCommentData {
    _id: string,
    content: string,
    date: string
}

export interface CommentFormData {
    content: string,
    date: string
}