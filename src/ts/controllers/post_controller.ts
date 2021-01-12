/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;

// INTERFACES / TYPES
import { PostData, NewPostData, EditPostData } from "../interfaces/post_interfaces";

type ResponseStatus = { status: "success", message?: "" } | { status: "failure", message?: "" } | { status: "pending", message?: "" };

class Post {
    constructor() { }

    async getOne(id: string): Promise<PostData> {
        let recievedData: PostData = {
            _id: "",
            title: "",
            subTitle: "",
            content: "",
            date: "",
            catId: ""
        };
        await fetch(`http://localhost:${PORT}/posts/${id}`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => response.json())
            .then(data => recievedData = data);
        return recievedData
    }

    async create(newPost: NewPostData, catId: string): Promise<ResponseStatus> {
        let recievedData: ResponseStatus = {
            status: "pending"
        }
        await fetch(`http://localhost:${PORT}/posts/create/${catId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then(data => recievedData = data)
            .catch(err => {
                console.log(err)
                recievedData = { status: "failure" }
            })

        return recievedData;
    }

    async update(id: string, newPost: EditPostData): Promise<ResponseStatus> {
        let recievedData: ResponseStatus = {
            status: "pending"
        }
        await fetch(`http://localhost:${PORT}/posts/update/${id}`, {
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
            .catch(err => {
                console.log(err)
                recievedData = { status: "failure" }
            })
        return recievedData;
    }

    async delete(id: string, catId: string): Promise<ResponseStatus> {
        let recievedData: ResponseStatus = {
            status: "pending"
        }
        console.log(catId, id)
        await fetch(`http://localhost:${PORT}/posts/delete/${id}/${catId}`, {
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
                recievedData = { status: "failure" }
            })
        return recievedData;
    }
}

export default Post;