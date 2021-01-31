/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

// ENV VARIABLES
const PORT = 5000;


class Post {
    constructor() { }
    async getOne(id: string): Promise<PostResponse> {
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

    async create(title: string, content: string, catId: string): Promise<PostResponse> {
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

        await fetch(`http://localhost:${PORT}/posts/create/${catId}`, {
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

    async update(id: string, newPost: EditPostData): Promise<PostResponse> {
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
            .catch(err => console.log(err))
        return recievedData;
    }

    async delete(id: string, catId: string): Promise<BasicResponse> {
        let recievedData: BasicResponse = {
            status: "pending"
        }
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
                recievedData = { status: "error" }
            })
        return recievedData;
    }
}

export default Post;