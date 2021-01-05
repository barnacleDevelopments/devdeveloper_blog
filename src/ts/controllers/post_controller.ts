/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: post_controller.ts
*/

class Post {
    constructor() {}
    
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

    async getOne(id) {
        let recievedData;
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

    async create(newPost) {
        let recievedData;
        console.log(newPost)
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

    async update(id, newPost) {
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

    async delete(id) {
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