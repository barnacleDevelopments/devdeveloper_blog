// /*
// AUTHOR: Devin Davis
// DATE: January 5th, 2021
// FILE: comment_controller.ts
// */

// ENV VARIABLES
const PORT = 5000;

type ResponseStatus = { status: "success", message?: "" } | { status: "failure", message?: "" } | { status: "pending", message?: "" };

class Comment {
    constructor() { }

    async getFromPost(id: string) {
        let recievedData: CommentComponentData[] = [
            {
                _id: "",
                content: "",
                date: "",
                username: "",
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

    async create(postId: string, newComment: NewCommentData, token: string): Promise<CommentComponentData> {
        let recievedData: CommentComponentData = {
            _id: "",
            content: "",
            date: "",
            username: "",
        };
        console.log(newComment.username)

        await fetch(`http://localhost:${PORT}/comments/create/${postId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(newComment),

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

    async delete(commentId: string, postId: string, token: string): Promise<ResponseStatus> {
        let recievedData: ResponseStatus = { status: "pending" }
        await fetch(`http://localhost:${PORT}/comments/delete/${commentId}/${postId}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`
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