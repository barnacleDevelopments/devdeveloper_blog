/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: category_controller.ts
*/
import { RessourceId } from "../customTypings/global_types";

const LOCAL_URL = "http://localhost:3000";

class Category {
    constructor() { }

    async getAll(): Promise<CategoryData[]> {
        let recievedData: CategoryData[] = [{
            _id: "",
            name: "",
            desc: "",
            count: 0,
            img: "",
            posts: []
        }]
            ;

        await fetch(`${LOCAL_URL}/api/categories/all`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data.data;
            });
        return recievedData
    }

    async getOne(catId: RessourceId): Promise<CategoryData> {
        let recievedData: CategoryData = {
            _id: "",
            name: "",
            desc: "",
            count: 0,
            img: "",
            posts: []
        }



        await fetch(`${LOCAL_URL}/api/categories/${catId}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data.data;
            });
        return recievedData;
    }

    async getPosts(catId: RessourceId): Promise<PostData[]> {
        let recievedData: PostData[] = [{
            _id: "",
            title: "",
            content: "",
            date: "",
            catId: ""
        }]

        await fetch(`${LOCAL_URL}/api/posts/${catId}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data.data;
            })
        return recievedData
    }

    async create(name: string, desc: string): Promise<CategoryData> {
        let recievedData: CategoryData = {
            _id: "",
            name: "",
            desc: "",
            count: 0,
            img: "",
            posts: []
        }

        await fetch(`${LOCAL_URL}/api/categories/create`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json"
            },
            body: JSON.stringify({ name, desc })
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data.data;
            })

        return recievedData;
    }

    async update(catId: RessourceId, name: string, desc: string): Promise<CategoryData> {
        let recievedData: CategoryData = {
            _id: "",
            name: "",
            desc: "",
            count: 0,
            img: "",
            posts: []
        }

        await fetch(`${LOCAL_URL}/api/categories/update/${catId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ name, desc })
        })
            .then(response => response.json())
            .then(data => recievedData = data.data)

        return recievedData;
    }

    async delete(catId: RessourceId) {
        await fetch(`${LOCAL_URL}/api/categories/delete/${catId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .catch(err => console.log(err))
    }
}

export default Category;