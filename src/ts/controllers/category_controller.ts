/*
AUTHOR: Devin Davis
DATE: January 3rd, 2021
FILE: category_controller.ts
*/

class Category {
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

    async getPosts(id) {
        let recievedData;

        await fetch(`http://localhost:3000/categories/posts/${id}`, {
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

    async create(newCategory) {
        console.log(newCategory)
        let recievedData;

        await fetch(`http://localhost:3000/categories/create`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Accept: "application/json" 
            },
            body: JSON.stringify(newCategory)
        })
        .then(response => response.json())
        .then(data => {
            recievedData = data;
        })

        return recievedData;
    }

    async update(id, newCategory) {
        await fetch(`http://localhost:3000/categories/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
            },
            body: JSON.stringify(newCategory)
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

export default Category;