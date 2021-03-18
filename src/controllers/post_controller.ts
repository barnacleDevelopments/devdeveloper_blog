/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

class Post {
    constructor() { }
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
        await fetch(`/api/posts/view/${postId}`, {
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
        await fetch(`/api/posts/update/${postId}`, {
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

    async delete(postId: RessourceId, catId: RessourceId): Promise<BasicResponse> {
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