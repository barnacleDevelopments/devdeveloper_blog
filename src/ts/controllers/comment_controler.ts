// /*
// AUTHOR: Devin Davis
// DATE: January 5th, 2021
// FILE: comment_controller.ts
// */

// ENV VARIABLES
const PORT = 5000;

// INTERFACES
import { CommentData, NewCommentData } from "../interfaces/comment_interfaces";

class Comment {
    constructor() { }

    async getFromPost(id: string) {
        let recievedData: CommentData[] = [
            {
                _id: "",
                content: "",
                date: "",
                userId: "",
                postId: "",
            }
        ];

        await fetch(`http://localhost:${PORT}/comments/post/${id}`, {
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

    async getOne(id: string) {
        let recievedData: CommentData = {
            _id: "",
            content: "",
            date: "",
            userId: "",
            postId: "",
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


    async create(userId: string, postId: string, newComment: NewCommentData) {
        let recievedData: NewCommentData[] = [{
            _id: "",
            content: "",
            date: "",
        }];
        await fetch(`http://localhost:${PORT}/comments/create/${userId}/${postId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json"
            },
            body: JSON.stringify(newComment)
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            })

        return recievedData;
    }

    async update(id: string, newComment: NewCommentData) {
        await fetch(`http://localhost:${PORT}/categories/update/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newComment)
        })
    }

    async delete(id: string) {
        await fetch(`http://localhost:${PORT}/comments/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
    }
}

export default Comment;