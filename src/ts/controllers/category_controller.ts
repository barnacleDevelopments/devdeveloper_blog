/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: category_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;



class Category {
    constructor() { }

    async getAll() {
        let recievedData: CategoriesResponse = {
            data: [{
                _id: "",
                name: "",
                desc: "",
                count: 0,
                img: "",
                posts: []
            }],
            status: "pending",
            message: ""
        };

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

    async getOne(id: string): Promise<CategoryResponse> {
        let recievedData: CategoryResponse = {
            data: {
                _id: "",
                name: "",
                desc: "",
                count: 0,
                img: "",
                posts: []
            },
            status: "pending",
            message: ""

        }

        await fetch(`http://localhost:${PORT}/categories/${id}`, {
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

    async getPosts(id: string): Promise<PostsResponse> {
        let recievedData: PostsResponse = {
            data: [{
                _id: "",
                title: "",
                content: "",
                date: "",
            }],
            status: "pending",
            message: ""
        }

        await fetch(`http://localhost:${PORT}/categories/posts/${id}`, {
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

    async create(name: string, desc: string, token: string): Promise<CategoryResponse> {
        let recievedData: CategoryResponse = {
            data: {
                _id: "",
                name: "",
                desc: "",
                count: 0,
                img: "",
                posts: [{
                    _id: "",
                    title: "",
                    content: "",
                    date: ""
                }]
            },
            status: "pending",
            message: ""

        }

        await fetch(`http://localhost:${PORT}/categories/create`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, desc })
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            })

        return recievedData;
    }

    async update(id: string, name: string, desc: string, token: string): Promise<CategoryResponse> {
        let recievedData: CategoryResponse = {
            data: {
                _id: "",
                name: "",
                desc: "",
                count: 0,
                img: "",
                posts: []
            },
            status: "pending",
            message: ""
        }
        await fetch(`http://localhost:${PORT}/categories/update/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, desc })
        })
            .then(response => response.json())
            .then(data => recievedData = data)

        return recievedData;
    }

    async delete(id: string, token: string): Promise<BasicResponse> {

        let recievedData: BasicResponse = { status: "pending", message: "" }

        await fetch(`http://localhost:${PORT}/categories/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data)


        return recievedData;
    }
}

export default Category;