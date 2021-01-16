/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: comment_interfaces.ts
*/

// INTERFACES
interface CommentComponentData {
    _id: string,
    content: string,
    date: string,
    username: string,
}

interface NewCommentData {
    _id: string,
    content: string,
    date: string
}

interface CommentFormData {
    content: string,
    date: string
}