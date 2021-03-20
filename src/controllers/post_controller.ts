/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

import { RessourceId } from "../customTypings/global_types";

class Post {
    constructor() { }

    async getAll(): Promise<PostResponse[]> {
        let recievedData: PostResponse[] = [{
            data: {
                _id: "",
                title: "",
                content: "",
                date: ""
            },
            status: "pending",
            message: ""
        }];
        await fetch(`http://localhost:3000/api/posts/all`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data.data);

        return recievedData
    }
    async getOne(postId: RessourceId): Promise<PostResponse> {
        let recievedData: PostResponse = {
            data: {
                _id: "",
                title: "",
                content: "",
                date: ""
            },
            status: "pending",
            message: ""
        };
        await fetch(`http://localhost:3000/api/posts/view/${postId}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data.data);
        return recievedData
    }

    async create(title: string, content: string, catId: RessourceId): Promise<PostResponse> {
        let recievedData: PostResponse = {
            data: {
                _id: "",
                title: "",
                content: "",
                date: "",
            },

            status: "pending",
            message: ""
        }

        await fetch(`/api/posts/create/${catId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ title, content })
        })
            .then(response => response.json())
            .then(data => recievedData = data)

        return recievedData;
    }

    async update(postId: RessourceId, newPost: EditPostData): Promise<PostResponse> {
        let recievedData: PostResponse = {
            data: {
                _id: "",
                title: "",
                content: "",
                date: ""
            },
            status: "pending",
            message: ""
        }
        await fetch(`http://localhost:3000/api/posts/update/${postId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then(data => recievedData = data)
            .catch(err => console.log(err))
        return recievedData;
    }

    async delete(postId: RessourceId, catId: any): Promise<BasicResponse> {
        let recievedData: BasicResponse = {
            status: "pending",
            message: ""
        }
        await fetch(`/api/posts/delete/${catId}/${postId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data)
            .catch(err => {
                console.log(err)
                recievedData = { status: "error", message: "" }
            })
        return recievedData;
    }
}

export default Post;