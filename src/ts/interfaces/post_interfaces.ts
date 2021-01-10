/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: post_interfaces.ts
*/

// INTERFACES
export interface PostData {
    _id: string,
    title: string,
    subTitle: string,
    content: string,
    catId: string,
    date: string
}

export interface NewPostData {
    title: string,
    content: string
}

export interface PostFormData {
    [index: string]: string,
    title: string,
    content: string,
}

export interface EditPostData {
    title: string,
    content: string
}
