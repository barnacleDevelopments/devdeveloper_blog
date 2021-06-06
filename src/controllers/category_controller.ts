/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: category_controller.ts
*/

const LOCAL_URL = "https://blog.devdeveloper.ca";

class Category {
    constructor() { }

    public static async getAll() {
        const promise = new Promise((resolve, reject) => {
            fetch(`${LOCAL_URL}/api/categories/all`, {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            })
                .then(response => response.json())
                .then(data => resolve(data.data))
                .catch(err => reject(err));
        })

        return promise;
    }

    public static async getOne(catId: RessourceId): Promise<CategoryData> {
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

    public static async getPosts(catId: RessourceId): Promise<PostData[]> {
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

    public static async create(category: CategoryFormData): Promise<CategoryData> {
        return new Promise((resolve, reject) => {
            fetch(`${LOCAL_URL}/api/categories/create`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    Accept: "application/json"
                },
                body: JSON.stringify(category)
            })
                .then(response => response.json())
                .then(data => resolve(data.data))
                .catch(err => reject(err))
        })
    }

    public static async update(catId: RessourceId, name: string, desc: string): Promise<CategoryData> {
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

    public static async delete(catId: RessourceId) {
        await fetch(`${LOCAL_URL}/api/categories/delete/${catId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })

    }
}

export default Category;