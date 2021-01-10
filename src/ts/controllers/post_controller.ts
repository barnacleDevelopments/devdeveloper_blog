/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;

// INTERFACES
import { PostData, NewPostData, EditPostData } from "../interfaces/post_interfaces";

class Post {
    constructor() { }

    async getAll() {
        let recievedData;
        await fetch(`http://localhost:${PORT}/posts`, {
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
            .then(data => {
                recievedData = data;
            });
        return recievedData
    }

    async create(newPost: NewPostData, catId: string): Promise<PostData> {
        let recievedData: PostData = {
            _id: "",
            title: "",
            subTitle: "",
            content: "",
            date: "",
            catId: ""
        };
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
            .then(data => {
                recievedData = data;
            });
        return recievedData;
    }

    async update(id: string, newPost: EditPostData) {
        console.log(newPost)
        await fetch(`http://localhost:${PORT}/posts/update/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response not ok.")
                }
            }).catch(err => console.log(err))
    }

    async delete(id: string, catId: string) {
        console.log(catId, id)
        await fetch(`http://localhost:${PORT}/posts/delete/${id}/${catId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response not ok.")
                }
            }).catch(err => console.log(err))
    }
}

export default Post;