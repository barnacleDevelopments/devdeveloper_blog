/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: category_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;

// INTERFACES
import { PostData } from "./post_controller";

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


class Category {
    constructor() { }

    async getAll() {
        let recievedData: CategoryData[] = [{
            _id: "",
            name: "",
            desc: "",
            count: 0,
            img: "",
            posts: [{
                _id: "",
                title: "",
                subTitle: "",
                content: "",
                catId: "",
                date: ""
            }]
        }];

        await fetch(`http://localhost:${PORT}/categories`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            });
        return recievedData
    }

    async getOne(id: string): Promise<CategoryData> {
        let recievedData: CategoryData = {
            _id: "",
            name: "",
            desc: "",
            count: 0,
            img: "",
            posts: [{
                _id: "",
                title: "",
                subTitle: "",
                content: "",
                catId: "",
                date: ""
            }]
        }

        await fetch(`http://localhost${PORT}/categories/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            });
        return recievedData;
    }

    async getPosts(id: string): Promise<CategoryData> {
        let recievedData: CategoryData = {
            _id: "",
            name: "",
            desc: "",
            count: 0,
            img: "",
            posts: [{
                _id: "",
                title: "",
                subTitle: "",
                content: "",
                catId: "",
                date: ""
            }]
        }

        await fetch(`http://localhost${PORT}/categories/posts/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                recievedData = data;
            });
        return recievedData
    }

    async create(newCategory: NewCategoryData) {
        let recievedData: NewCategoryData = {
            name: "",
            desc: "",
        }

        await fetch(`http://localhost${PORT}/categories/create`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json"
            },
            body: JSON.stringify(newCategory)
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            })

        return recievedData;
    }

    async update(id: string, newCategory: NewCategoryData) {
        await fetch(`http://localhost${PORT}/categories/update/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newCategory)
        })
    }

    async delete(id: string) {
        await fetch(`http://localhost${PORT}/categories/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
    }
}

export default Category;