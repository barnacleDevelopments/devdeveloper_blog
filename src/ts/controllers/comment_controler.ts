/*
AUTHOR: Devin Davis
DATE: January 5th, 2021
FILE: comment_controller.ts
*/

class Comment {
    constructor() {}
    
    async getAll() {
        let recievedData;

        await fetch(`http://localhost:3000/categories`, {
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

        await fetch(`http://localhost:3000/categories/${id}`, {
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


    async create(newComment) {
        let recievedData;

        await fetch(`http://localhost:3000/categories/create`, {
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

    async update(id, newComment) {
        await fetch(`http://localhost:3000/categories/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
            },
            body: JSON.stringify(newComment)
        })
    }

    async delete(id) {
        await fetch(`http://localhost:3000/categories/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
            }
        })
    }
}

export default Comment;