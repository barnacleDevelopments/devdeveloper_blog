/*
AUTHOR: Devin Davis
DATE: January 7th, 2021
FILE: category_interfaces.ts
*/



// INTERFACES
interface CategoryData {
    _id: string,
    name: string,
    desc: string,
    count: number,
    img: string,
    posts: PostData[]
}

interface NewCategoryData {
    name: string,
    desc: string,
}

interface CategoryFormData {
    [index: string]: string,
    name: string,
    desc: string
}