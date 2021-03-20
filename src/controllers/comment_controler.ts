// /*
// AUTHOR: Devin Davis
// DATE: January 5th, 2021
// FILE: comment_controller.ts
// */

import { RessourceId } from "../customTypings/global_types";

class Comment {
    constructor() { }

    async getFromPost(postId: RessourceId): Promise<CommentComponentData[]> {
        let recievedData: CommentComponentData[] = [
            {
                _id: "",
                content: "",
                date: "",
                username: "",
            }
        ];

        await fetch(`http://localhost:3000/api/comments/${postId}`, {
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

    async create(postId: RessourceId, newComment: NewCommentData): Promise<CommentComponentData> {
        let recievedData: CommentComponentData = {
            _id: "",
            content: "",
            date: "",
            username: "",
        };

        await fetch(`/api/comments/create/${postId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
            },
            body: JSON.stringify(newComment),

        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            })

        return recievedData;
    }

    async update(comId: RessourceId, newComment: NewCommentData) {
        await fetch(`/categories/update/${comId}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newComment)
        })
    }

    async delete(commentId: RessourceId, postId: RessourceId): Promise<BasicResponse> {
        let recievedData: BasicResponse = { status: "pending" }
        await fetch(`/api/comments/delete/${postId}/${commentId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            })
        return recievedData;
    }

}

export default Comment;