/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: category_controller.ts
*/

// ENV VARIABLES
class Category {
    constructor() { }

    async getAll(): Promise<BasicResponse | CategoriesResponse> {
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

        await fetch(`/api/categories/all`, {
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

    async getOne(catId: RessourceId): Promise<CategoryResponse> {
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

        await fetch(`/api/categories/${catId}`, {
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

    async getPosts(catId: RessourceId): Promise<PostsResponse> {
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

        await fetch(`/api/posts/${catId}`, {
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

    async create(name: string, desc: string): Promise<CategoryResponse> {
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

        await fetch(`/api/categories/create`, {
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
                recievedData = data;
            })

        return recievedData;
    }

    async update(catId: RessourceId, name: string, desc: string): Promise<CategoryResponse> {
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
        await fetch(`/api/categories/update/${catId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ name, desc })
        })
            .then(response => response.json())
            .then(data => recievedData = data)

        return recievedData;
    }

    async delete(catId: RessourceId): Promise<BasicResponse> {

        let recievedData: BasicResponse = { status: "pending", message: "" }

        await fetch(`/api/categories/delete/${catId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data)


        return recievedData;
    }
}

export default Category;