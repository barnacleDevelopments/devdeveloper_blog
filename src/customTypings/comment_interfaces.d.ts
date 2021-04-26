/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: comment_interfaces.ts
*/

// INTERFACES
type CommentComponentData = {
    _id: string,
    content: string,
    date: string,
    username: string,
}

type NewCommentData = {
    _id: string,
    content: string,
    date: string,
    username: string,
    userId: string
}

type CommentFormData = {
    content: string,
    date: string
}

type CategoryInputData = {
    [index: string]: string,
    name: string,
    desc: string
}