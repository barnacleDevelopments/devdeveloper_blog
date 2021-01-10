/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: category_interfaces.ts
*/

import { PostData } from "../interfaces/post_interfaces";

// INTERFACES
export interface CategoryData {
    _id: string,
    name: string,
    desc: string,
    count: number,
    img: string,
    posts: PostData[]
}

export interface NewCategoryData {
    name: string,
    desc: string,
}

export interface CategoryFormData {
    [index: string]: string,
    name: string,
    desc: string
}