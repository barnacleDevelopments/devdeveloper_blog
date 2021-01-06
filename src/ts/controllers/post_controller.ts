/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

// INTERFACES
export interface PostData {
    _id: string,
    title: string,
    subTitle: string,
    content: string,
    catId: string,
    date: string
}

export interface NewPostData {
    title: string,
    content: string,
    catId: string
}

class Post {
    constructor() { }

    async getAll() {
        let recievedData;
        await fetch(`http://localhost:3000/posts`, {
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
        await fetch(`http://localhost:3000/posts/${id}`, {
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

    async create(newPost: NewPostData) {
        let recievedData: NewPostData = {
            title: "",
            content: "",
            catId: ""
        };

        await fetch(`http://localhost:3000/posts/create/${newPost.catId}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json"
            },
            body: JSON.stringify(newPost)
        })
            .then(response => response.json())
            .then(data => {
                recievedData = data;
            })

        return recievedData;
    }

    async update(id: string, newPost: NewPostData) {
        await fetch(`http://localhost:3000/posts/update/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newPost)
        })
    }

    async delete(id: string) {
        await fetch(`http://localhost:3000/posts/delete/${id}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })
    }
}

export default Post;